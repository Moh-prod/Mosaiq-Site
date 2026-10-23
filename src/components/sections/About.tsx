import { ArrowRight, Award, HeartHandshake, Puzzle, Wallet } from 'lucide-react';
import type { CSSProperties } from 'react';
import QuoteLink from '@/components/QuoteLink';
import Typo from '@/components/Typo';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { whatsappLink } from '@/lib/contact';
import { fr } from '@/lib/format';
import styles from './About.module.css';

const VALUES = [
  {
    icon: Puzzle,
    title: 'Un seul interlocuteur',
    text: 'Site, vidéo et IA réunis : plus besoin de jongler entre plusieurs prestataires.',
  },
  {
    icon: Award,
    title: 'Qualité professionnelle',
    text: 'Design moderne, sites rapides, vidéos soignées : des standards internationaux.',
  },
  {
    icon: Wallet,
    title: 'Des prix adaptés au marché',
    text: 'Des forfaits clairs en F CFA, sans frais cachés, pour toutes les tailles d\'entreprise.',
  },
  {
    icon: HeartHandshake,
    title: 'Proximité et réactivité',
    text: 'Basés au Mali et joignables sur WhatsApp, nous comprenons vos clients et votre marché.',
  },
];

const STATS = [
  { value: '3', label: 'expertises complémentaires' },
  { value: '1', label: 'interlocuteur unique pour tout' },
  { value: '24h/24', label: 'votre site et votre chatbot travaillent' },
  { value: '100 %', label: 'adapté au mobile' },
];

export default function About() {
  return (
    <section id="pourquoi" className={`section section--dark ${styles.about}`} aria-labelledby="pourquoi-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.intro} data-reveal>
          <p className="eyebrow">Pourquoi MOSAIQ</p>
          <h2 id="pourquoi-title" className={styles.title}>
            <Typo text="Une mosaïque d'expertises, une seule vision : votre croissance." />
          </h2>
          <p>
            Une mosaïque, ce sont des pièces différentes qui, bien assemblées, forment une image forte. C&apos;est notre
            méthode&nbsp;: votre site, vos vidéos et vos outils d&apos;IA sont pensés ensemble, pour une image cohérente et
            des résultats concrets.
          </p>
          <p>
            Notre mission&nbsp;: rendre le digital professionnel accessible à toutes les entreprises du Mali et d&apos;Afrique
            de l&apos;Ouest, avec des solutions modernes, des prix justes et un accompagnement humain.
          </p>
          <div className={styles.actions}>
            <QuoteLink className="btn btn--primary">
              Parlons de votre projet
              <ArrowRight aria-hidden="true" />
            </QuoteLink>
            <a href={whatsappLink()} className="btn btn--ghost-light" target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              WhatsApp
            </a>
          </div>
        </div>

        <ul className={styles.values}>
          {VALUES.map(({ icon: ValueIcon, title, text }, index) => (
            <li key={title} className={styles.value} data-reveal style={{ '--delay': `${index * 80}ms` } as CSSProperties}>
              <span className={styles.valueIcon}>
                <ValueIcon aria-hidden="true" />
              </span>
              <h3>{title}</h3>
              <p>{fr(text)}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="container">
        <dl className={styles.stats} data-reveal>
          {STATS.map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
