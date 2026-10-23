import { CircleAlert, CircleCheck } from 'lucide-react';
import {
  useEffect,
  useId,
  useRef,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { mailtoLink, whatsappLink } from '@/lib/contact';
import f from './Form.module.css';

type FieldProps = {
  label: string;
  /** Les champs sont obligatoires sauf s'ils sont marqués facultatifs. */
  optional?: boolean;
  hint?: string;
};

function FieldShell({ id, label, optional, hint, children }: FieldProps & { id: string; children: ReactNode }) {
  return (
    <div className={f.field}>
      <label htmlFor={id} className={f.label}>
        {label}
        {optional && <span className={f.optional}> (facultatif)</span>}
      </label>
      {children}
      {hint && (
        <p id={`${id}-hint`} className={f.hint}>
          {hint}
        </p>
      )}
    </div>
  );
}

export function TextField({ label, optional, hint, ...props }: FieldProps & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} optional={optional} hint={hint}>
      <input
        id={id}
        className={f.input}
        required={!optional}
        aria-describedby={hint ? `${id}-hint` : undefined}
        {...props}
      />
    </FieldShell>
  );
}

export function TextArea({ label, optional, hint, ...props }: FieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} optional={optional} hint={hint}>
      <textarea
        id={id}
        className={f.textarea}
        required={!optional}
        aria-describedby={hint ? `${id}-hint` : undefined}
        {...props}
      />
    </FieldShell>
  );
}

export function SelectField({
  label,
  optional,
  hint,
  children,
  ...props
}: FieldProps & SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} optional={optional} hint={hint}>
      <select id={id} className={f.select} required={!optional} aria-describedby={hint ? `${id}-hint` : undefined} {...props}>
        {children}
      </select>
    </FieldShell>
  );
}

/** Champ piège invisible : les robots le remplissent, Netlify écarte alors l'envoi. */
export function Honeypot() {
  return (
    <p className={f.honeypot} aria-hidden="true">
      <label>
        Ne pas remplir ce champ
        <input name="bot-field" tabIndex={-1} autoComplete="off" />
      </label>
    </p>
  );
}

/** Message d'erreur avec des solutions de repli (le message du visiteur est repris dans WhatsApp). */
export function FormError({ fallbackMessage }: { fallbackMessage: string }) {
  return (
    <div className={f.alert} role="alert">
      <CircleAlert aria-hidden="true" />
      <p>
        Oups, l&apos;envoi n&apos;a pas fonctionné. Réessayez dans un instant ou contactez-nous directement sur{' '}
        <a href={whatsappLink(fallbackMessage)} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>{' '}
        ou par{' '}
        <a href={mailtoLink('Demande depuis le site MOSAIQ', fallbackMessage)}>e-mail</a>.
      </p>
    </div>
  );
}

type FormSuccessProps = {
  title: string;
  text: string;
  whatsappMessage: string;
  onReset: () => void;
  resetLabel?: string;
};

export function FormSuccess({ title, text, whatsappMessage, onReset, resetLabel = 'Envoyer un autre message' }: FormSuccessProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div className={f.success} role="status">
      <span className={f.successIcon}>
        <CircleCheck aria-hidden="true" />
      </span>
      <h3 ref={headingRef} tabIndex={-1}>
        {title}
      </h3>
      <p>{text}</p>
      <div className={f.successActions}>
        <a href={whatsappLink(whatsappMessage)} className="btn btn--whatsapp" target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon />
          Accélérer sur WhatsApp
        </a>
        <button type="button" className="btn btn--secondary" onClick={onReset}>
          {resetLabel}
        </button>
      </div>
    </div>
  );
}

/** « Aminata Traoré » → « Aminata » */
export const firstName = (fullName: string) => fullName.trim().split(/\s+/)[0] ?? '';
