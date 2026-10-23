import { BadgeCheck, MessagesSquare, Phone, Wallet } from 'lucide-react';
import type { CSSProperties } from 'react';
import QuoteForm from '@/components/forms/QuoteForm';
import Typo from '@/components/Typo';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import type { Offer } from '@/data/offers';
import { site } from '@/data/site';
import { telLink, whatsappLink } from '@/lib/contact';
import styles from './QuoteSection.module.css';

const PROMISES = [
  { icon: BadgeCheck, text: 'Devis gratuit et sans engagement' },
  { icon: MessagesSquare, text: 'Conseils adaptés à votre activité' },
  { icon: Wallet, text: 'Une proposition ajustée à votre budget' },
];

export default function QuoteSection({ offers }: { offers: Offer[] }) {
  return (
    <section id="devis" className={`section ${styles.section}`} aria-labelledby="devis-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.intro} data-reveal>
          <p className="eyebrow">Projets personnalisés</p>
          <h2 id="devis-title" className={styles.title}>
            <Typo text="Un projet sur mesure ? Parlons-en." />
          </h2>
          <p className={styles.lead}>
            Site plus complet, série de vidéos, chatbot connecté à vos outils, automatisation de vos tâches… Décrivez votre
            besoin&nbsp;: nous vous envoyons un devis personnalisé, clair et détaillé.
          </p>
          <ul className={styles.promises}>
            {PROMISES.map(({ icon: PromiseIcon, text }) => (
              <li key={text}>
                <span>
                  <PromiseIcon aria-hidden="true" />
                </span>
                {text}
              </li>
            ))}
          </ul>
          <div className={styles.direct}>
            <p>Vous préférez en parler directement&nbsp;?</p>
            <div className={styles.directLinks}>
              <a href={whatsappLink()} className="btn btn--whatsapp btn--sm" target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                WhatsApp
              </a>
              <a href={telLink()} className="btn btn--secondary btn--sm">
                <Phone aria-hidden="true" />
                {site.phones[0].display}
              </a>
            </div>
          </div>
        </div>

        <div className={styles.formCard} data-reveal style={{ '--delay': '100ms' } as CSSProperties}>
          <h3 className={styles.formTitle}>Demander un devis personnalisé</h3>
          <p className={styles.formSubtitle}>2 minutes suffisent. Les champs facultatifs sont indiqués.</p>
          <QuoteForm offers={offers} />
        </div>
      </div>
    </section>
  );
}
