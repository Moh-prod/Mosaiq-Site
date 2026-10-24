import { ArrowRight, Bot, Check, Clapperboard, Globe, Lock, Play, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import QuoteLink from '@/components/QuoteLink';
import type { Project } from '@/data/projects';
import { getService } from '@/data/services';
import { formatPrice } from '@/lib/format';
import styles from './Hero.module.css';

// Prix d'appel des sites web, repris de src/data/services.ts.
const SITE_PRICE = formatPrice(getService('sites-web')?.startingPrice ?? 0);

const HERO_SERVICES = [
  { href: '/#sites-web', icon: Globe, label: 'Sites web vitrines', detail: `dès ${SITE_PRICE}`, tone: styles.toneIndigo },
  { href: '/#motion-design', icon: Clapperboard, label: 'Vidéos motion-design', detail: 'Pubs, Reels, UGC', tone: styles.toneOrange },
  { href: '/#integration-ia', icon: Bot, label: 'Chatbots & IA', detail: 'Réponses 24h/24', tone: styles.toneGold },
];

export default function Hero({ featured }: { featured?: Project }) {
  return (
    <section id="accueil" className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={styles.badge}>
            <span className={styles.badgeDot} aria-hidden="true" />
            Agence digitale · Mali, Côte d&apos;Ivoire &amp; Afrique de l&apos;Ouest
          </p>

          <h1 id="hero-title" className={styles.title}>
            Rendez votre entreprise <span className={styles.hlIndigo}>visible</span>
            <span className="punct">,</span> <span className={styles.hlOrange}>mémorable</span> et{' '}
            <span className={styles.hlGold}>disponible 24h/24</span>
            <span className="punct">.</span>
          </h1>

          <p className={styles.lead}>
            Sites web professionnels, vidéos motion-design et assistants IA&nbsp;: MOSAIQ (Mosaic Company) assemble
            toutes les pièces de votre présence digitale, pour les entreprises au Mali, en Côte d&apos;Ivoire et en
            Afrique de l&apos;Ouest.
          </p>

          <ul className={styles.services}>
            {HERO_SERVICES.map(({ href, icon: ServiceIcon, label, detail, tone }) => (
              <li key={href}>
                <Link href={href} className={styles.service}>
                  <span className={`${styles.serviceIcon} ${tone}`}>
                    <ServiceIcon aria-hidden="true" />
                  </span>
                  <span>
                    <strong>{label}</strong>
                    <span className={styles.serviceDetail}>{detail}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className={styles.ctas}>
            <QuoteLink className="btn btn--primary btn--lg">
              Demander un devis gratuit
              <ArrowRight aria-hidden="true" />
            </QuoteLink>
            <Link href="/#offres" className="btn btn--secondary btn--lg">
              Voir nos offres
            </Link>
          </div>

          <ul className={styles.trust}>
            <li>
              <Check aria-hidden="true" /> Devis gratuit et sans engagement
            </li>
            <li>
              <Check aria-hidden="true" /> Réponse rapide sur WhatsApp
            </li>
            <li>
              <Check aria-hidden="true" /> Tarifs clairs en F CFA
            </li>
          </ul>
        </div>

        <HeroMosaic featured={featured} />
      </div>
    </section>
  );
}

/** Visuel « mosaïque » : une pièce par service (site réel, vidéo, assistant IA). */
function HeroMosaic({ featured }: { featured?: Project }) {
  return (
    <div className={styles.visual}>
      <div className={styles.mosaic}>
        <figure className={`${styles.tile} ${styles.site}`}>
          <div className={styles.browserBar} aria-hidden="true">
            <span className={styles.dots}>
              <i />
              <i />
              <i />
            </span>
            <span className={styles.address}>
              <Lock />
              {featured?.url ? new URL(featured.url).host : 'votre-entreprise.com'}
            </span>
          </div>
          <div className={styles.screen}>
            {featured && (
              <Image
                src={featured.image}
                alt={`Site ${featured.title} réalisé par MOSAIQ`}
                fill
                loading="eager"
                sizes="(min-width: 1100px) 420px, (min-width: 640px) 60vw, 80vw"
              />
            )}
          </div>
          {featured && <figcaption className={styles.siteCaption}>Réalisation : {featured.title}</figcaption>}
        </figure>

        <div className={`${styles.tile} ${styles.stat}`} aria-hidden="true">
          <strong>24h/24</strong>
          <span>vos clients ont une réponse</span>
        </div>

        <div className={`${styles.tile} ${styles.spark}`} aria-hidden="true">
          <Sparkles />
        </div>

        <div className={`${styles.tile} ${styles.video}`} aria-hidden="true">
          <span className={styles.shapeRing} />
          <span className={styles.shapeSquare} />
          <span className={styles.play}>
            <Play />
          </span>
          <div className={styles.videoMeta}>
            <strong>Motion-design</strong>
            <span>0:24</span>
          </div>
          <div className={styles.progress}>
            <i />
          </div>
        </div>

        <div className={`${styles.tile} ${styles.chat}`} aria-hidden="true">
          <div className={styles.chatHead}>
            <span className={styles.chatAvatar}>
              <Bot />
            </span>
            <span>
              <strong>Assistant IA</strong>
              <em>En ligne</em>
            </span>
          </div>
          <p className={styles.msgUser}>Bonjour, combien coûte un site&nbsp;?</p>
          <p className={styles.msgBot}>Nos sites démarrent à {SITE_PRICE}&nbsp;😊 Je vous montre les offres&nbsp;?</p>
          <p className={styles.typing}>
            <i />
            <i />
            <i />
          </p>
        </div>

        <span className={`${styles.deco} ${styles.decoA}`} aria-hidden="true" />
        <span className={`${styles.deco} ${styles.decoB}`} aria-hidden="true" />
        <span className={`${styles.deco} ${styles.decoC}`} aria-hidden="true" />
      </div>
    </div>
  );
}
