import { ArrowRight, Menu, Phone, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { site } from '@/data/site';
import { telLink, whatsappLink } from '@/lib/contact';
import { cx } from '@/lib/cx';
import Logo from './Logo';
import QuoteLink from './QuoteLink';
import WhatsAppIcon from './WhatsAppIcon';
import styles from './Header.module.css';

const NAV = [
  { id: 'services', label: 'Services' },
  { id: 'realisations', label: 'Réalisations' },
  { id: 'pourquoi', label: 'Pourquoi nous' },
  { id: 'offres', label: 'Offres' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
];

/** Sections de l'accueil rattachées à un lien du menu (pour surligner la rubrique en cours). */
const SECTION_TO_NAV: Record<string, string | null> = {
  accueil: null,
  services: 'services',
  realisations: 'realisations',
  temoignages: 'realisations',
  pourquoi: 'pourquoi',
  processus: 'pourquoi',
  offres: 'offres',
  devis: 'offres',
  faq: 'faq',
  contact: 'contact',
};

export default function Header() {
  const router = useRouter();
  const isHome = router.pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Surligne la rubrique visible à l'écran (accueil uniquement).
  useEffect(() => {
    if (!isHome) {
      setActive(null);
      return;
    }
    const sections = Object.keys(SECTION_TO_NAV)
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(SECTION_TO_NAV[entry.target.id] ?? null);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  // Menu mobile : fermeture avec Échap et blocage du défilement en arrière-plan.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const close = () => setOpen(false);
    router.events.on('routeChangeStart', close);
    router.events.on('hashChangeStart', close);
    return () => {
      router.events.off('routeChangeStart', close);
      router.events.off('hashChangeStart', close);
    };
  }, [router.events]);

  return (
    <header className={cx(styles.header, (scrolled || open) && styles.solid, open && styles.open)}>
      <div className={cx('container', styles.bar)}>
        <Link href="/" className={styles.brand} aria-label="MOSAIQ, retour à l'accueil">
          <Logo />
        </Link>

        <nav className={styles.nav} aria-label="Navigation principale">
          <ul className={styles.navList}>
            {NAV.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/#${item.id}`}
                  className={cx(styles.navLink, active === item.id && styles.active)}
                  aria-current={active === item.id ? 'location' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <a href={telLink()} className={styles.phone}>
            <Phone aria-hidden="true" />
            {site.phones[0].display}
          </a>
          <QuoteLink className={cx('btn btn--primary btn--sm', styles.cta)}>Devis gratuit</QuoteLink>
          <button
            type="button"
            className={styles.burger}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div id="menu-mobile" className={styles.mobileMenu} inert={!open}>
        <nav aria-label="Navigation mobile">
          <ul className={styles.mobileNav}>
            {NAV.map((item) => (
              <li key={item.id}>
                <Link href={`/#${item.id}`} onClick={() => setOpen(false)}>
                  {item.label}
                  <ArrowRight aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.mobileActions}>
          <QuoteLink className="btn btn--primary btn--lg btn--block" onClick={() => setOpen(false)}>
            Demander un devis gratuit
          </QuoteLink>
          <a href={whatsappLink()} className="btn btn--whatsapp btn--lg btn--block" target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
            Écrire sur WhatsApp
          </a>
          <a href={telLink()} className="btn btn--secondary btn--lg btn--block">
            <Phone aria-hidden="true" />
            Appeler le {site.phones[0].display}
          </a>
        </div>
      </div>
    </header>
  );
}
