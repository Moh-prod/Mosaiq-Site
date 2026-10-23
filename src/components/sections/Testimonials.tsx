import { Quote, Star } from 'lucide-react';
import type { CSSProperties } from 'react';
import SectionHeading from '@/components/SectionHeading';
import type { Testimonial } from '@/data/testimonials';
import { fr, initials } from '@/lib/format';
import styles from './Testimonials.module.css';

const AVATAR_TONES = [styles.toneIndigo, styles.toneOrange, styles.toneGold];

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;

  return (
    <section id="temoignages" className="section section--muted" aria-labelledby="temoignages-title">
      <div className="container">
        <SectionHeading
          id="temoignages-title"
          eyebrow="Témoignages"
          title="Ils nous ont fait confiance"
          subtitle="Commerçants, entrepreneurs, dirigeants : ils racontent ce que MOSAIQ a changé pour leur entreprise."
        />

        <ul className={styles.list}>
          {testimonials.map((testimonial, index) => (
            <li
              key={testimonial.name}
              className={styles.item}
              data-reveal
              style={{ '--delay': `${index * 90}ms` } as CSSProperties}
            >
              <figure className={styles.card}>
                <div className={styles.cardTop}>
                  <span className={styles.stars} role="img" aria-label="Note : 5 sur 5">
                    {Array.from({ length: 5 }, (_, star) => (
                      <Star key={star} aria-hidden="true" />
                    ))}
                  </span>
                  <Quote className={styles.quoteIcon} aria-hidden="true" />
                </div>
                <blockquote className={styles.quote}>
                  <p>{fr(`« ${testimonial.quote} »`)}</p>
                </blockquote>
                <figcaption className={styles.author}>
                  <span className={`${styles.avatar} ${AVATAR_TONES[index % AVATAR_TONES.length]}`} aria-hidden="true">
                    {initials(testimonial.name)}
                  </span>
                  <span>
                    <strong>{testimonial.name}</strong>
                    <span className={styles.role}>
                      {testimonial.role}, {testimonial.company}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
