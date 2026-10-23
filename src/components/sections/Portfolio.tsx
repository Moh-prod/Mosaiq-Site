import { ArrowRight, ArrowUpRight, Check, Clapperboard, Lock, MapPin, Sparkles } from 'lucide-react';
import Image from 'next/image';
import type { CSSProperties } from 'react';
import QuoteLink from '@/components/QuoteLink';
import SectionHeading from '@/components/SectionHeading';
import Typo from '@/components/Typo';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { categoryLabels, type Project, type ProjectCategory } from '@/data/projects';
import type { ServiceSlug } from '@/data/services';
import { whatsappLink } from '@/lib/contact';
import { cx } from '@/lib/cx';
import styles from './Portfolio.module.css';

const CATEGORY_CTA: Record<ProjectCategory, { service: ServiceSlug; label: string }> = {
  'site-web': { service: 'sites-web', label: 'Je veux un site comme celui-ci' },
  'motion-design': { service: 'motion-design', label: 'Je veux une vidéo comme celle-ci' },
  ia: { service: 'integration-ia', label: 'Je veux un assistant comme celui-ci' },
};

const hostOf = (url: string) => new URL(url).host;

export default function Portfolio({ projects }: { projects: Project[] }) {
  const featured = projects.find((project) => project.featured) ?? projects[0];
  const others = projects.filter((project) => project !== featured);
  const hasVideo = projects.some((project) => project.category === 'motion-design');
  const cardCount = others.length + 1 + (hasVideo ? 0 : 1);

  return (
    <section id="realisations" className="section" aria-labelledby="realisations-title">
      <div className="container">
        <SectionHeading
          id="realisations-title"
          eyebrow="Nos réalisations"
          title="Découvrez nos réalisations"
          subtitle="Chaque projet est conçu sur mesure, pour l'image et les objectifs de nos clients, au Mali comme à l'international."
        />

        {featured && <FeaturedProject project={featured} />}

        <div className={cx(styles.grid, cardCount >= 3 && styles.gridThree)}>
          {others.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}

          <div className={styles.ctaCard} data-reveal>
            <span className={styles.ctaIcon}>
              <Sparkles aria-hidden="true" />
            </span>
            <h3>
              <Typo text="Votre entreprise, notre prochaine réalisation ?" />
            </h3>
            <p>Site web, vidéo ou chatbot : parlez-nous de votre projet, nous vous proposons une solution sur mesure.</p>
            <QuoteLink className="btn btn--primary">
              Lancer mon projet
              <ArrowRight aria-hidden="true" />
            </QuoteLink>
          </div>

          {!hasVideo && (
            <div className={cx(styles.ctaCard, styles.ctaVideo)} data-reveal style={{ '--delay': '90ms' } as CSSProperties}>
              <span className={styles.ctaIcon}>
                <Clapperboard aria-hidden="true" />
              </span>
              <h3>Motion-design : des exemples sur demande</h3>
              <p>
                Nos vidéos arrivent bientôt ici. En attendant, recevez des exemples adaptés à votre secteur directement sur
                WhatsApp.
              </p>
              <a
                href={whatsappLink('Bonjour MOSAIQ, je souhaite voir des exemples de vidéos motion-design.')}
                className="btn btn--whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon />
                Recevoir des exemples
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/** Projet mis en avant : capture ordinateur dans un navigateur + capture mobile. */
export function FeaturedProject({ project }: { project: Project }) {
  const cta = CATEGORY_CTA[project.category];
  const screen = (
    <>
      <div className={styles.browserBar} aria-hidden="true">
        <span className={styles.dots}>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.address}>
          <Lock />
          {project.url ? hostOf(project.url) : project.title}
        </span>
      </div>
      <div className={styles.screen}>
        <Image
          src={project.image}
          alt={`Page d'accueil du site ${project.title}`}
          fill
          sizes="(min-width: 1200px) 640px, (min-width: 1024px) 52vw, 92vw"
        />
        {project.url && (
          <span className={styles.overlay} aria-hidden="true">
            <span className={styles.overlayBtn}>
              Voir le site en ligne <ArrowUpRight />
            </span>
          </span>
        )}
      </div>
    </>
  );

  return (
    <article className={styles.featured} data-reveal>
      <div className={styles.visual}>
        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.browser}
            aria-label={`Voir le site ${project.title} (nouvel onglet)`}
          >
            {screen}
          </a>
        ) : (
          <div className={styles.browser}>{screen}</div>
        )}
        {project.imageMobile && (
          <div className={styles.phone} aria-hidden="true">
            <Image src={project.imageMobile} alt="" fill sizes="180px" />
          </div>
        )}
      </div>

      <div className={styles.details}>
        <div className={styles.chips}>
          <span className={styles.chip}>{categoryLabels[project.category]}</span>
          <span className={cx(styles.chip, styles.chipMuted)}>
            <MapPin aria-hidden="true" />
            {project.location}
          </span>
        </div>
        <h3 className={styles.projectTitle}>{project.title}</h3>
        <p className={styles.sector}>{project.sector}</p>
        <p className={styles.description}>{project.description}</p>
        <h4 className={styles.deliverablesTitle}>Ce que nous avons réalisé</h4>
        <ul className={styles.deliverables}>
          {project.deliverables.map((item) => (
            <li key={item}>
              <Check aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
        <div className={styles.actions}>
          {project.url && (
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn btn--secondary">
              Voir le site
              <ArrowUpRight aria-hidden="true" />
            </a>
          )}
          <QuoteLink service={cta.service} className="btn btn--primary">
            {cta.label}
          </QuoteLink>
        </div>
      </div>
    </article>
  );
}

/** Carte d'un projet secondaire, avec résumé au survol. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={styles.card} data-reveal>
      <div className={styles.cardMedia}>
        {project.video ? (
          <video src={project.video} poster={project.image} autoPlay muted loop playsInline preload="none" aria-hidden="true" />
        ) : (
          <Image src={project.image} alt="" fill sizes="(min-width: 1100px) 380px, (min-width: 720px) 46vw, 92vw" />
        )}
        <div className={styles.cardOverlay} aria-hidden="true">
          <p>{project.summary}</p>
          {project.url && (
            <span className={styles.cardOverlayLink}>
              Voir le projet <ArrowUpRight />
            </span>
          )}
        </div>
      </div>
      <div className={styles.cardBody}>
        <span className={styles.chip}>{categoryLabels[project.category]}</span>
        <h3 className={styles.cardTitle}>
          {project.url ? (
            <a href={project.url} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </h3>
        <p className={styles.cardMeta}>
          {project.sector} · {project.location}
        </p>
        <p className={styles.cardSummary}>{project.summary}</p>
      </div>
    </article>
  );
}
