import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import Icon from '@/components/Icon';
import SectionHeading from '@/components/SectionHeading';
import type { ServiceSummary } from '@/data/services';
import { cx } from '@/lib/cx';
import { formatPrice, fr } from '@/lib/format';
import styles from './Services.module.css';

export default function Services({ services }: { services: ServiceSummary[] }) {
  return (
    <section id="services" className="section section--muted" aria-labelledby="services-title">
      <div className="container">
        <SectionHeading
          id="services-title"
          eyebrow="Nos services"
          title="Trois expertises pour faire grandir votre entreprise"
          subtitle="Choisissez un service ou combinez-les : chaque pièce de votre mosaïque digitale est pensée pour fonctionner avec les autres."
        />

        <div className={styles.grid}>
          {services.map((service, index) => (
            <article
              key={service.slug}
              id={service.slug}
              className={cx(styles.card, styles[service.tone])}
              data-reveal
              style={{ '--delay': `${index * 90}ms` } as CSSProperties}
            >
              <div className={styles.top}>
                <span className={styles.icon}>
                  <Icon name={service.icon} />
                </span>
                <span className={styles.tiles} aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
              </div>
              <h3 className={styles.title}>{service.title}</h3>
              <p className={styles.tagline}>{fr(service.tagline)}</p>
              <p className={styles.description}>{fr(service.description)}</p>
              <ul className={styles.benefits}>
                {service.benefits.map((benefit) => (
                  <li key={benefit}>
                    <Check aria-hidden="true" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <div className={styles.footer}>
                {service.startingPrice && (
                  <p className={styles.price}>
                    À partir de <strong>{formatPrice(service.startingPrice)}</strong>
                  </p>
                )}
                <Link href={`/services/${service.slug}`} className={styles.link}>
                  {service.linkLabel}
                  <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
