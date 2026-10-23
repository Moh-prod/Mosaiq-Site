import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';
import { fr } from '@/lib/format';
import Typo from './Typo';
import styles from './SectionHeading.module.css';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  subtitle?: ReactNode;
  align?: 'center' | 'left';
  id?: string;
  className?: string;
};

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center', id, className }: SectionHeadingProps) {
  return (
    <div className={cx(styles.heading, align === 'center' && styles.center, className)} data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className={styles.title}>
        <Typo text={title} />
      </h2>
      {subtitle && <p className={styles.subtitle}>{typeof subtitle === 'string' ? fr(subtitle) : subtitle}</p>}
    </div>
  );
}
