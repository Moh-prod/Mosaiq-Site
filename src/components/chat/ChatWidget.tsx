import { ArrowRight, ArrowUpRight, Mail, MessageCircle, Phone, Send, UserRound, X } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { firstName } from '@/components/forms/Fields';
import { LogoMark } from '@/components/Logo';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import {
  getAssistantReply,
  quickReplies,
  welcomeReply,
  type AssistantAction,
  type AssistantReply,
} from '@/lib/assistant';
import { mailtoLink, telLink, whatsappLink } from '@/lib/contact';
import { cx } from '@/lib/cx';
import { onOpenChat } from '@/lib/events';
import { fr } from '@/lib/format';
import { formDataToFields, submitNetlifyForm } from '@/lib/forms';
import styles from './ChatWidget.module.css';

type Message = AssistantReply & { id: number; from: 'bot' | 'user' };

const HISTORY_KEY = 'mosaiq-assistant-historique';
const TEASER_KEY = 'mosaiq-assistant-invitation';
const TEASER_DELAY_MS = 12000;

const isSmallScreen = () => window.matchMedia('(max-width: 639px)').matches;

function readSession(key: string): string | null {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeSession(key: string, value: string): void {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    // Stockage indisponible (navigation privée…) : l'assistant fonctionne sans historique.
  }
}

/**
 * Assistant virtuel MOSAIQ : répond aux questions fréquentes, oriente vers les offres
 * et transmet les demandes de rappel à l'équipe (formulaire Netlify « assistant »).
 */
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ id: 0, from: 'bot', ...welcomeReply }]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState('');
  const [lead, setLead] = useState({ open: false, contact: '', key: 0 });
  const [leadStatus, setLeadStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const [teaser, setTeaser] = useState(false);
  const [unread, setUnread] = useState(true);

  const nextId = useRef(1);
  const replyTimer = useRef<number | undefined>(undefined);
  const skipFirstSave = useRef(true);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const titleId = useId();
  const inputId = useId();

  // Reprise de la conversation lors de la navigation entre les pages.
  useEffect(() => {
    try {
      const saved = JSON.parse(readSession(HISTORY_KEY) ?? 'null') as Message[] | null;
      if (Array.isArray(saved) && saved.length > 0) {
        setMessages(saved);
        nextId.current = Math.max(...saved.map((message) => message.id)) + 1;
        setUnread(false);
      }
    } catch {
      // Historique illisible : on repart de zéro.
    }
    return () => window.clearTimeout(replyTimer.current);
  }, []);

  useEffect(() => {
    if (skipFirstSave.current) {
      skipFirstSave.current = false;
      return;
    }
    writeSession(HISTORY_KEY, JSON.stringify(messages.slice(-40)));
  }, [messages]);

  // Petite bulle d'invitation après quelques secondes (une fois par visite).
  useEffect(() => {
    if (readSession(TEASER_KEY)) return;
    const timer = window.setTimeout(() => setTeaser(true), TEASER_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const dismissTeaser = useCallback(() => {
    setTeaser(false);
    writeSession(TEASER_KEY, '1');
  }, []);

  const openPanel = useCallback(() => {
    setOpen(true);
    setUnread(false);
    dismissTeaser();
  }, [dismissTeaser]);

  const closePanel = useCallback(() => {
    setOpen(false);
    launcherRef.current?.focus();
  }, []);

  useEffect(() => onOpenChat(openPanel), [openPanel]);

  useEffect(() => {
    if (!open) return;
    if (!isSmallScreen()) inputRef.current?.focus({ preventScroll: true });
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closePanel();
    };
    document.addEventListener('keydown', onKeyDown);
    // Plein écran sur mobile : on bloque le défilement de la page en dessous.
    const lockScroll = isSmallScreen();
    if (lockScroll) document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      if (lockScroll) document.body.style.overflow = '';
    };
  }, [open, closePanel]);

  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTo({ top: list.scrollHeight, behavior: 'smooth' });
  }, [messages, typing, lead.open]);

  const pushBot = (reply: AssistantReply) =>
    setMessages((current) => [...current, { id: nextId.current++, from: 'bot', ...reply }]);

  const send = (text: string) => {
    const content = text.trim();
    if (!content || typing) return;
    setMessages((current) => [
      ...current.map((message) => ({ ...message, suggestions: false })),
      { id: nextId.current++, from: 'user', text: content },
    ]);
    setInput('');
    setTyping(true);

    const reply = getAssistantReply(content);
    replyTimer.current = window.setTimeout(
      () => {
        setTyping(false);
        pushBot(reply);
        if (reply.lead) setLead((current) => ({ open: true, contact: reply.lead?.contact ?? '', key: current.key + 1 }));
      },
      Math.min(450 + reply.text.length * 6, 1400),
    );
  };

  const openLead = () => setLead((current) => ({ open: true, contact: '', key: current.key + 1 }));

  const onNavigate = () => {
    if (isSmallScreen()) setOpen(false);
  };

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = formDataToFields(new FormData(event.currentTarget));
    setLeadStatus('sending');
    try {
      await submitNetlifyForm('assistant', {
        ...fields,
        page: window.location.href,
        transcript: messages
          .slice(-12)
          .map((message) => `${message.from === 'user' ? 'Visiteur' : 'Assistant'} : ${message.text}`)
          .join('\n'),
      });
      setLeadStatus('idle');
      setLead((current) => ({ ...current, open: false }));
      pushBot({
        text: `Merci ${firstName(fields.name ?? '')} ! 🙏 Votre demande est bien transmise à l'équipe MOSAIQ. Nous vous recontactons très vite.`,
        actions: [{ kind: 'whatsapp', label: 'Écrire aussi sur WhatsApp' }],
      });
    } catch (error) {
      console.error(error);
      setLeadStatus('error');
    }
  }

  return (
    <>
      {teaser && !open && (
        <div className={styles.teaser}>
          <button type="button" className={styles.teaserBody} onClick={openPanel}>
            👋 Une question&nbsp;? Je vous réponds tout de suite.
          </button>
          <button type="button" className={styles.teaserClose} onClick={dismissTeaser} aria-label="Masquer l'invitation">
            <X aria-hidden="true" />
          </button>
        </div>
      )}

      <section
        id={panelId}
        className={cx(styles.panel, open && styles.panelOpen)}
        role="dialog"
        aria-labelledby={titleId}
        inert={!open}
      >
        <header className={styles.head}>
          <span className={styles.avatar}>
            <LogoMark variant="plain" />
          </span>
          <div>
            <h2 id={titleId} className={styles.title}>
              Assistant MOSAIQ
            </h2>
            <p className={styles.status}>En ligne · réponse immédiate</p>
          </div>
          <button type="button" className={styles.close} onClick={closePanel} aria-label="Fermer l'assistant">
            <X aria-hidden="true" />
          </button>
        </header>

        <div ref={listRef} className={styles.messages} aria-live="polite">
          {messages.map((message) => (
            <div key={message.id} className={cx(styles.message, message.from === 'user' ? styles.fromUser : styles.fromBot)}>
              <p className={styles.bubble}>{fr(message.text)}</p>
              {message.actions && message.actions.length > 0 && (
                <div className={styles.actions}>
                  {message.actions.map((action) => (
                    <ActionButton key={`${action.kind}-${action.label}`} action={action} onLead={openLead} onNavigate={onNavigate} />
                  ))}
                </div>
              )}
              {message.suggestions && (
                <div className={styles.suggestions}>
                  {quickReplies.map((reply) => (
                    <button key={reply.label} type="button" className={styles.suggestion} onClick={() => send(reply.text)}>
                      {reply.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {typing && (
            <div className={cx(styles.message, styles.fromBot)}>
              <p className={cx(styles.bubble, styles.typing)}>
                <span className="visually-hidden">L&apos;assistant écrit…</span>
                <i aria-hidden="true" />
                <i aria-hidden="true" />
                <i aria-hidden="true" />
              </p>
            </div>
          )}

          {lead.open && (
            <form key={lead.key} className={styles.lead} onSubmit={submitLead}>
              <p className={styles.leadTitle}>Être recontacté par l&apos;équipe</p>
              <input type="text" name="bot-field" tabIndex={-1} autoComplete="off" className={styles.honeypot} aria-hidden="true" />
              <label>
                Votre nom
                <input name="name" required autoComplete="name" />
              </label>
              <label>
                Téléphone / WhatsApp ou e-mail
                <input name="contact" required defaultValue={lead.contact} autoComplete="tel" />
              </label>
              <label>
                Votre besoin <span className={styles.optional}>(facultatif)</span>
                <textarea name="message" rows={2} />
              </label>
              {leadStatus === 'error' && (
                <p className={styles.leadError} role="alert">
                  L&apos;envoi a échoué. Écrivez-nous plutôt sur{' '}
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                  .
                </p>
              )}
              <div className={styles.leadActions}>
                <button type="submit" className="btn btn--primary btn--sm" disabled={leadStatus === 'sending'}>
                  {leadStatus === 'sending' ? 'Envoi…' : 'Envoyer'}
                </button>
                <button type="button" className="btn btn--secondary btn--sm" onClick={() => setLead((current) => ({ ...current, open: false }))}>
                  Annuler
                </button>
              </div>
            </form>
          )}
        </div>

        <form
          className={styles.composer}
          onSubmit={(event) => {
            event.preventDefault();
            send(input);
          }}
        >
          <label htmlFor={inputId} className="visually-hidden">
            Votre message
          </label>
          <input
            ref={inputRef}
            id={inputId}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Écrivez votre question…"
            autoComplete="off"
            maxLength={500}
          />
          <button type="submit" aria-label="Envoyer le message" disabled={!input.trim() || typing}>
            <Send aria-hidden="true" />
          </button>
        </form>
        <p className={styles.footnote}>
          Assistant automatique ·{' '}
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            Parler à un humain
          </a>
        </p>
      </section>

      <button
        ref={launcherRef}
        type="button"
        className={cx(styles.launcher, open && styles.launcherOpen, unread && styles.unread)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Fermer l'assistant" : "Ouvrir l'assistant MOSAIQ"}
        onClick={() => (open ? closePanel() : openPanel())}
      >
        {open ? <X aria-hidden="true" /> : <MessageCircle aria-hidden="true" />}
        {unread && !open && (
          <span className={styles.badge} aria-hidden="true">
            1
          </span>
        )}
      </button>
    </>
  );
}

function ActionButton({
  action,
  onLead,
  onNavigate,
}: {
  action: AssistantAction;
  onLead: () => void;
  onNavigate: () => void;
}) {
  switch (action.kind) {
    case 'link':
      return (
        <Link href={action.href} className={styles.action} onClick={onNavigate}>
          {action.label}
          <ArrowRight aria-hidden="true" />
        </Link>
      );
    case 'external':
      return (
        <a href={action.href} className={styles.action} target="_blank" rel="noopener noreferrer">
          {action.label}
          <ArrowUpRight aria-hidden="true" />
        </a>
      );
    case 'whatsapp':
      return (
        <a href={whatsappLink(action.message)} className={cx(styles.action, styles.actionWhatsapp)} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon />
          {action.label}
        </a>
      );
    case 'call':
      return (
        <a href={telLink()} className={styles.action}>
          <Phone aria-hidden="true" />
          {action.label}
        </a>
      );
    case 'email':
      return (
        <a href={mailtoLink('Demande depuis le site MOSAIQ')} className={styles.action}>
          <Mail aria-hidden="true" />
          {action.label}
        </a>
      );
    case 'lead':
      return (
        <button type="button" className={styles.action} onClick={onLead}>
          <UserRound aria-hidden="true" />
          {action.label}
        </button>
      );
  }
}
