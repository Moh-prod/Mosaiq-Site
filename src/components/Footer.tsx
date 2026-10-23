import { Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { services } from '@/data/services';
import { site } from '@/data/site';
import { mailtoLink, telLink, whatsappLink } from '@/lib/contact';
import { cx } from '@/lib/cx';
import Logo from './Logo';
import WhatsAppIcon from './WhatsAppIcon';
import styles from './Footer.module.css';

const AGENCY_LINKS = [
  { href: '/#realisations', label: 'Réalisations' },
  { href: '/#temoignages', label: 'Témoignages' },
  { href: '/#pourquoi', label: 'Pourquoi MOSAIQ' },
  { href: '/#processus', label: 'Notre processus' },
  { href: '/#faq', label: 'Questions fréquentes' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={cx('container', styles.top)}>
        <div className={styles.brand}>
          <Link href="/" aria-label="MOSAIQ, retour à l'accueil" className={styles.logoLink}>
            <Logo variant="light" />
          </Link>
          <p>
            Sites web, vidéos motion-design et intelligence artificielle pour les entreprises du Mali et d&apos;Afrique de
            l&apos;Ouest.
          </p>
          <a href={whatsappLink()} className="btn btn--whatsapp btn--sm" target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
            Discuter sur WhatsApp
          </a>
          {site.socials.length > 0 && (
            <ul className={styles.socials}>
              {site.socials.map((social) => (
                <li key={social.url}>
                  <a href={social.url} target="_blank" rel="noopener noreferrer">
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav className={styles.col} aria-labelledby="footer-services">
          <h2 id="footer-services">Services</h2>
          <ul>
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`}>{service.title}</Link>
              </li>
            ))}
            <li>
              <Link href="/#offres">Nos offres et tarifs</Link>
            </li>
          </ul>
        </nav>

        <nav className={styles.col} aria-labelledby="footer-agence">
          <h2 id="footer-agence">Agence</h2>
          <ul>
            {AGENCY_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.col}>
          <h2>Contact</h2>
          <ul className={styles.contactList}>
            {site.phones.map((phone) => (
              <li key={phone.tel}>
                <Phone aria-hidden="true" />
                <a href={telLink(phone.tel)}>
                  {phone.display}
                  <span className={styles.hint}>{phone.label.replace('Téléphone ', '')}</span>
                </a>
              </li>
            ))}
            <li>
              <Mail aria-hidden="true" />
              <a href={mailtoLink('Demande d’information — MOSAIQ')}>{site.email}</a>
            </li>
            <li>
              <MapPin aria-hidden="true" />
              <span>Basés au {site.country}, disponibles à distance</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={cx('container', styles.bottom)}>
        {/* L'année est figée au moment du build : on tolère l'écart éventuel au chargement. */}
        <p suppressHydrationWarning>
          © {year} {site.name}. Tous droits réservés.
        </p>
        <p>{site.domain} · Conçu et développé au Mali</p>
      </div>
    </footer>
  );
}
