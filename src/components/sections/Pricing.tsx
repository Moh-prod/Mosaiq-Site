import { Check, Globe, Star } from 'lucide-react';
import type { CSSProperties } from 'react';
import QuoteLink from '@/components/QuoteLink';
import SectionHeading from '@/components/SectionHeading';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import type { Offer } from '@/data/offers';
import { whatsappLink } from '@/lib/contact';
import { cx } from '@/lib/cx';
import { formatAmount, formatPrice, fr } from '@/lib/format';
import styles from './Pricing.module.css';

export default function Pricing({ offers }: { offers: Offer[] }) {
  return (
    <section id="offres" className="section section--muted" aria-labelledby="offres-title">
      <div className="container">
        <SectionHeading
          id="offres-title"
          eyebrow="Nos offres"
          title="Des forfaits clairs, sans mauvaise surprise"
          subtitle="Choisissez la formule adaptée à votre activité. Chaque projet commence par un devis gratuit et détaillé."
        />

        <div className={styles.grid}>
          {offers.map((offer, index) => (
            <OfferCard key={offer.id} offer={offer} delay={index * 80} />
          ))}
        </div>

        <aside className={styles.option} data-reveal aria-labelledby="option-domaine">
          <span className={styles.optionIcon}>
            <Globe aria-hidden="true" />
          </span>
          <div className={styles.optionText}>
            <h3 id="option-domaine">Option nom de domaine & hébergement</h3>
            <p>
              Pas technicien&nbsp;? Nous réservons votre adresse web (ex. <strong>votre-entreprise.com</strong>), hébergeons
              votre site et gérons les renouvellements pour vous. Tarif selon l&apos;extension choisie.
            </p>
          </div>
          <a
            href={whatsappLink("Bonjour MOSAIQ, je souhaite connaître le tarif de l'option nom de domaine + hébergement.")}
            className="btn btn--secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Demander le tarif
          </a>
        </aside>

        <p className={styles.note}>Tarifs en francs CFA (XOF). Besoin d&apos;une formule sur mesure&nbsp;? Demandez un devis personnalisé.</p>
      </div>
    </section>
  );
}

export function OfferCard({ offer, delay = 0 }: { offer: Offer; delay?: number }) {
  return (
    <article
      className={cx(styles.card, offer.highlight && styles.highlight)}
      data-reveal
      style={{ '--delay': `${delay}ms` } as CSSProperties}
    >
      {offer.badge && (
        <p className={styles.badge}>
          <Star aria-hidden="true" />
          {offer.badge}
        </p>
      )}
      <h3 className={styles.name}>{offer.name}</h3>
      <p className={styles.tagline}>{fr(offer.tagline)}</p>
      <p className={styles.price}>
        <span className={styles.amount}>{formatAmount(offer.price)}</span>
        <span className={styles.currency}>F CFA</span>
      </p>
      <ul className={styles.features}>
        {offer.features.map((feature) => (
          <li key={feature}>
            <Check aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>
      <div className={styles.actions}>
        <QuoteLink offer={offer.id} className={cx('btn btn--block', offer.highlight ? 'btn--primary' : 'btn--dark')}>
          Choisir cette offre
        </QuoteLink>
        <a
          href={whatsappLink(`Bonjour MOSAIQ, je suis intéressé(e) par l'offre « ${offer.name} » (${formatPrice(offer.price)}).`)}
          className={styles.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon />
          ou commander sur WhatsApp
        </a>
      </div>
    </article>
  );
}
