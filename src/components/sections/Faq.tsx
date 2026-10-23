import { MessageCircle } from 'lucide-react';
import FaqList from '@/components/FaqList';
import SectionHeading from '@/components/SectionHeading';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import type { FaqItem } from '@/data/faq';
import { whatsappLink } from '@/lib/contact';
import { openChat } from '@/lib/events';
import styles from './Faq.module.css';

export default function Faq({ faqs }: { faqs: FaqItem[] }) {
  return (
    <section id="faq" className="section section--muted" aria-labelledby="faq-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.aside}>
          <SectionHeading
            id="faq-title"
            align="left"
            eyebrow="Questions fréquentes"
            title="Vous avez des questions ? Nous avons les réponses."
            subtitle="Délais, paiement, maintenance : tout ce qu'il faut savoir avant de vous lancer."
            className={styles.heading}
          />
          <div className={styles.help} data-reveal>
            <p className={styles.helpTitle}>Vous ne trouvez pas votre réponse&nbsp;?</p>
            <p>Notre assistant vous répond tout de suite, et l&apos;équipe reste disponible sur WhatsApp.</p>
            <div className={styles.helpActions}>
              <button type="button" className="btn btn--dark btn--sm" onClick={openChat}>
                <MessageCircle aria-hidden="true" />
                Poser ma question
              </button>
              <a href={whatsappLink()} className="btn btn--whatsapp btn--sm" target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div data-reveal>
          <FaqList items={faqs} idPrefix="faq" />
        </div>
      </div>
    </section>
  );
}
