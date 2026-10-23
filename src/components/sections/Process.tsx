import { ArrowRight } from 'lucide-react';
import type { CSSProperties } from 'react';
import Icon from '@/components/Icon';
import QuoteLink from '@/components/QuoteLink';
import SectionHeading from '@/components/SectionHeading';
import type { ProcessStep } from '@/data/process';
import { cx } from '@/lib/cx';
import { fr } from '@/lib/format';
import styles from './Process.module.css';

type ProcessProps = {
  steps: ProcessStep[];
  id?: string;
  muted?: boolean;
};

export default function Process({ steps, id = 'processus', muted = false }: ProcessProps) {
  return (
    <section id={id} className={cx('section', muted && 'section--muted')} aria-labelledby={`${id}-title`}>
      <div className="container">
        <SectionHeading
          id={`${id}-title`}
          eyebrow="Notre processus"
          title="Un projet simple, du premier message à la mise en ligne"
          subtitle="Une méthode claire en 4 étapes : vous savez toujours où en est votre projet."
        />

        <ol className={styles.steps}>
          {steps.map((step, index) => (
            <li key={step.title} className={styles.step} data-reveal style={{ '--delay': `${index * 100}ms` } as CSSProperties}>
              <span className={styles.icon}>
                <Icon name={step.icon} />
              </span>
              <p className={styles.number}>Étape {String(index + 1).padStart(2, '0')}</p>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.text}>{fr(step.text)}</p>
            </li>
          ))}
        </ol>

        <p className={styles.cta} data-reveal>
          <span>La première étape est gratuite et sans engagement.</span>
          <QuoteLink className="text-link">
            Demander mon devis
            <ArrowRight aria-hidden="true" />
          </QuoteLink>
        </p>
      </div>
    </section>
  );
}
