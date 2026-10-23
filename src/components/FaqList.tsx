import { Plus } from 'lucide-react';
import { useState } from 'react';
import { cx } from '@/lib/cx';
import { fr } from '@/lib/format';
import styles from './FaqList.module.css';

type FaqListProps = {
  items: { question: string; answer: string }[];
  /** Préfixe unique pour les identifiants (plusieurs FAQ peuvent coexister). */
  idPrefix: string;
};

/** Accordéon accessible : une question ouverte à la fois, la première par défaut. */
export default function FaqList({ items, idPrefix }: FaqListProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={styles.list}>
      {items.map((item, index) => {
        const open = openIndex === index;
        const buttonId = `${idPrefix}-question-${index}`;
        const panelId = `${idPrefix}-reponse-${index}`;
        return (
          <div key={item.question} className={cx(styles.item, open && styles.open)}>
            <h3 className={styles.question}>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
              >
                <span>{fr(item.question)}</span>
                <span className={styles.toggle} aria-hidden="true">
                  <Plus />
                </span>
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={buttonId} className={styles.panel} inert={!open}>
              <div className={styles.panelInner}>
                <p>{fr(item.answer)}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
