import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import type { CSSProperties, ReactNode } from 'react';
import ContactForm from '@/components/forms/ContactForm';
import SectionHeading from '@/components/SectionHeading';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { site } from '@/data/site';
import { mailtoLink, telLink, whatsappLink } from '@/lib/contact';
import { cx } from '@/lib/cx';
import styles from './Contact.module.css';

type Channel = {
  href: string;
  icon: ReactNode;
  label: string;
  value: string;
  hint: string;
  tone?: string;
  external?: boolean;
};

const CHANNELS: Channel[] = [
  {
    href: whatsappLink(),
    icon: <WhatsAppIcon />,
    label: 'WhatsApp',
    value: site.whatsapp.display,
    hint: 'Le plus rapide pour nous joindre',
    tone: styles.whatsapp,
    external: true,
  },
  ...site.phones.map((phone) => ({
    href: telLink(phone.tel),
    icon: <Phone aria-hidden="true" />,
    label: phone.label,
    value: phone.display,
    hint: 'Appel direct',
  })),
  {
    href: mailtoLink('Demande d’information — MOSAIQ'),
    icon: <Mail aria-hidden="true" />,
    label: 'E-mail',
    value: site.email,
    hint: 'Pour les demandes détaillées',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeading
          id="contact-title"
          eyebrow="Contact"
          title="Parlons de votre projet"
          subtitle="Une question, une idée, un besoin urgent ? Écrivez-nous ou appelez-nous : nous vous répondons rapidement."
        />

        <div className={styles.grid}>
          <div className={styles.channels} data-reveal>
            <ul className={styles.cards}>
              {CHANNELS.map((channel) => (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    className={cx(styles.card, channel.tone)}
                    {...(channel.external && { target: '_blank', rel: 'noopener noreferrer' })}
                  >
                    <span className={styles.cardIcon}>{channel.icon}</span>
                    <span className={styles.cardText}>
                      <span className={styles.cardLabel}>{channel.label}</span>
                      <strong className={styles.cardValue}>{channel.value}</strong>
                      <span className={styles.cardHint}>{channel.hint}</span>
                    </span>
                    <ArrowUpRight className={styles.cardArrow} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
            <p className={styles.location}>
              <MapPin aria-hidden="true" />
              <span>
                <strong>Basés au {site.country}.</strong> Nous accompagnons les entreprises partout au Mali et à
                l&apos;international, à distance.
              </span>
            </p>
          </div>

          <div className={styles.formCard} data-reveal style={{ '--delay': '100ms' } as CSSProperties}>
            <h3 className={styles.formTitle}>Envoyez-nous un message</h3>
            <p className={styles.formSubtitle}>Nous vous répondons par e-mail ou par téléphone.</p>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
