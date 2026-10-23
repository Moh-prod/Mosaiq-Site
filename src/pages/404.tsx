import { ArrowLeft, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { LogoMark } from '@/components/Logo';
import Seo from '@/components/Seo';
import { openChat } from '@/lib/events';
import styles from '@/styles/NotFound.module.css';

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page introuvable | MOSAIQ"
        description="Cette page n'existe pas ou a été déplacée. Retrouvez nos sites web, vidéos motion-design et solutions d'IA sur l'accueil."
        path="/404"
        noindex
      />
      <section className={styles.page} aria-labelledby="introuvable-title">
        <div className={`container ${styles.inner}`}>
          <LogoMark className={styles.mark} />
          <p className="eyebrow">Erreur 404</p>
          <h1 id="introuvable-title" className={styles.title}>
            Il manque une pièce à la mosaïque…
          </h1>
          <p className={styles.text}>
            La page que vous cherchez n&apos;existe pas ou a été déplacée. Revenez à l&apos;accueil ou posez votre question
            à notre assistant.
          </p>
          <div className={styles.actions}>
            <Link href="/" className="btn btn--primary btn--lg">
              <ArrowLeft aria-hidden="true" />
              Retour à l&apos;accueil
            </Link>
            <button type="button" className="btn btn--secondary btn--lg" onClick={openChat}>
              <MessageCircle aria-hidden="true" />
              Poser une question
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
