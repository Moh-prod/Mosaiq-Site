import { ArrowLeft, ArrowRight, Check, ChevronRight } from 'lucide-react';
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import FaqList from '@/components/FaqList';
import Icon from '@/components/Icon';
import QuoteLink from '@/components/QuoteLink';
import SectionHeading from '@/components/SectionHeading';
import Seo from '@/components/Seo';
import Typo from '@/components/Typo';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { FeaturedProject, ProjectCard } from '@/components/sections/Portfolio';
import { OfferCard } from '@/components/sections/Pricing';
import Process from '@/components/sections/Process';
import { offers, type Offer } from '@/data/offers';
import { processSteps, type ProcessStep } from '@/data/process';
import { projects, type Project } from '@/data/projects';
import { getService, services, toSummary, type Service, type ServiceSummary } from '@/data/services';
import { whatsappLink } from '@/lib/contact';
import { cx } from '@/lib/cx';
import { formatPrice, fr } from '@/lib/format';
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from '@/lib/seo';
import styles from '@/styles/ServicePage.module.css';

type Props = {
  service: Service;
  relatedProjects: Project[];
  relatedOffers: Offer[];
  otherServices: ServiceSummary[];
  steps: ProcessStep[];
};

export const getStaticPaths = (async () => ({
  paths: services.map((service) => ({ params: { slug: service.slug } })),
  fallback: false,
})) satisfies GetStaticPaths;

export const getStaticProps = (async ({ params }) => {
  const service = getService(params?.slug ?? '');
  if (!service) return { notFound: true };
  return {
    props: {
      service,
      relatedProjects: projects.filter((project) => project.category === service.projectCategory),
      relatedOffers: offers.filter((offer) => offer.services.includes(service.slug)),
      otherServices: services.filter((other) => other.slug !== service.slug).map(toSummary),
      steps: processSteps,
    },
  };
}) satisfies GetStaticProps<Props, { slug: string }>;

export default function ServicePage({
  service,
  relatedProjects,
  relatedOffers,
  otherServices,
  steps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { page } = service;
  const path = `/services/${service.slug}`;
  const [featuredProject, ...moreProjects] = relatedProjects;

  return (
    <>
      <Seo
        title={page.seoTitle}
        description={page.seoDescription}
        path={path}
        keywords={[
          service.title,
          service.shortTitle,
          'MOSAIQ',
          'Mosaic Company',
          'Mosaiq Company',
          'Mosaic',
          'Mali',
          'Bamako',
          "Côte d'Ivoire",
          'Abidjan',
          "Afrique de l'Ouest",
          ...service.page.features.map((f) => f.title),
        ]}
        jsonLd={[
          serviceJsonLd(service, path),
          breadcrumbJsonLd([
            { name: 'Accueil', path: '/' },
            { name: 'Services', path: '/#services' },
            { name: service.title, path },
          ]),
          faqJsonLd(page.faqs),
        ]}
      />

      {/* ----- En-tête de la page ----- */}
      <section className={cx(styles.hero, styles[service.tone])} aria-labelledby="service-title">
        <div className={cx('container', styles.heroInner)}>
          <div className={styles.heroCopy}>
            <nav aria-label="Fil d'Ariane">
              <ol className={styles.breadcrumb}>
                <li>
                  <Link href="/">Accueil</Link>
                  <ChevronRight aria-hidden="true" />
                </li>
                <li>
                  <Link href="/#services">Services</Link>
                  <ChevronRight aria-hidden="true" />
                </li>
                <li aria-current="page">{service.shortTitle}</li>
              </ol>
            </nav>
            <p className="eyebrow">{page.eyebrow}</p>
            <h1 id="service-title" className={styles.title}>
              <Typo text={page.h1} />
            </h1>
            <p className={styles.intro}>{fr(page.intro)}</p>
            <div className={styles.ctas}>
              <QuoteLink service={service.slug} className="btn btn--primary btn--lg">
                Demander un devis gratuit
                <ArrowRight aria-hidden="true" />
              </QuoteLink>
              <a
                href={whatsappLink(`Bonjour MOSAIQ, je souhaite en savoir plus sur : ${service.title}.`)}
                className="btn btn--whatsapp btn--lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon />
                Discuter sur WhatsApp
              </a>
            </div>
            <p className={styles.heroNote}>
              <Check aria-hidden="true" />
              {service.startingPrice
                ? `À partir de ${formatPrice(service.startingPrice)} · devis gratuit et sans engagement`
                : 'Devis gratuit et sans engagement'}
            </p>
          </div>

          <div className={styles.heroVisual} aria-hidden="true">
            <span className={cx(styles.vTile, styles.vMain)}>
              <Icon name={service.icon} />
            </span>
            {page.features.slice(0, 4).map((feature) => (
              <span key={feature.title} className={cx(styles.vTile, styles.vSmall)}>
                <Icon name={feature.icon} />
              </span>
            ))}
            <span className={cx(styles.vTile, styles.vWide)}>
              <strong>{service.shortTitle}</strong>
              <span>par MOSAIQ</span>
            </span>
            <span className={cx(styles.vTile, styles.vAccent)} />
          </div>
        </div>
      </section>

      {/* ----- Pourquoi c'est important ----- */}
      <section className="section" aria-labelledby="pourquoi-service-title">
        <div className="container">
          <SectionHeading
            id="pourquoi-service-title"
            eyebrow="Pourquoi c'est important"
            title={service.tagline}
            subtitle={service.description}
          />
          <ul className={styles.highlights}>
            {page.highlights.map((highlight, index) => (
              <li
                key={highlight.title}
                className={cx(styles.highlight, styles[service.tone])}
                data-reveal
                style={{ '--delay': `${index * 90}ms` } as CSSProperties}
              >
                <span className={styles.highlightIcon}>
                  <Icon name={highlight.icon} />
                </span>
                <h3>{highlight.title}</h3>
                <p>{fr(highlight.text)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ----- Ce qui est inclus ----- */}
      <section className="section section--muted" aria-labelledby="inclus-title">
        <div className="container">
          <SectionHeading id="inclus-title" eyebrow="Ce que nous faisons pour vous" title="Tout ce qu'il faut, rien de superflu" />
          <ul className={styles.features}>
            {page.features.map((feature, index) => (
              <li key={feature.title} className={styles.feature} data-reveal style={{ '--delay': `${(index % 3) * 80}ms` } as CSSProperties}>
                <span className={cx(styles.featureIcon, styles[service.tone])}>
                  <Icon name={feature.icon} />
                </span>
                <div>
                  <h3>{feature.title}</h3>
                  <p>{fr(feature.text)}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.idealFor} data-reveal>
            <h3>Idéal pour</h3>
            <ul>
              {page.idealFor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ----- Réalisations ----- */}
      <section className="section" aria-labelledby="exemples-title">
        <div className="container">
          <SectionHeading id="exemples-title" eyebrow="Exemples" title={featuredProject ? 'Une réalisation récente' : 'Nos exemples'} />
          {featuredProject ? (
            <>
              <FeaturedProject project={featuredProject} />
              {moreProjects.length > 0 && (
                <div className={styles.moreProjects}>
                  {moreProjects.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className={styles.examplesCta} data-reveal>
              <p>
                Nos réalisations dans ce domaine arrivent très bientôt sur le site. En attendant, nous vous envoyons des
                exemples adaptés à votre secteur, directement sur WhatsApp.
              </p>
              <a
                href={whatsappLink(`Bonjour MOSAIQ, je souhaite voir des exemples : ${service.title}.`)}
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
      </section>

      {/* ----- Offres ----- */}
      {relatedOffers.length > 0 && (
        <section className="section section--muted" aria-labelledby="offres-service-title">
          <div className="container">
            <SectionHeading
              id="offres-service-title"
              eyebrow="Tarifs"
              title="Les offres qui incluent ce service"
              subtitle="Des forfaits clairs en F CFA. Besoin d'autre chose ? Demandez un devis personnalisé."
            />
            <div className={cx(styles.offers, relatedOffers.length >= 4 && styles.offersFour)}>
              {relatedOffers.map((offer, index) => (
                <OfferCard key={offer.id} offer={offer} delay={index * 80} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Process steps={steps} id="processus-service" />

      {/* ----- FAQ ----- */}
      <section className="section section--muted" aria-labelledby="faq-service-title">
        <div className={cx('container', styles.faq)}>
          <SectionHeading id="faq-service-title" eyebrow="Questions fréquentes" title="Vos questions, nos réponses" />
          <FaqList items={page.faqs} idPrefix={`faq-${service.slug}`} />
        </div>
      </section>

      {/* ----- Appel à l'action final ----- */}
      <section className={cx('section section--dark', styles.ctaBand)} aria-labelledby="cta-service-title">
        <div className={cx('container', styles.ctaInner)}>
          <div data-reveal>
            <h2 id="cta-service-title" className={styles.ctaTitle}>
              <Typo text={page.cta.title} />
            </h2>
            <p className={styles.ctaText}>{fr(page.cta.text)}</p>
            <div className={styles.ctas}>
              <QuoteLink service={service.slug} className="btn btn--primary btn--lg">
                Demander un devis gratuit
                <ArrowRight aria-hidden="true" />
              </QuoteLink>
              <a href={whatsappLink()} className="btn btn--ghost-light btn--lg" target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                WhatsApp
              </a>
            </div>
          </div>

          <nav className={styles.otherServices} aria-label="Nos autres services" data-reveal>
            <p>Découvrez aussi</p>
            <ul>
              {otherServices.map((other) => (
                <li key={other.slug}>
                  <Link href={`/services/${other.slug}`}>
                    <span className={cx(styles.otherIcon, styles[other.tone])}>
                      <Icon name={other.icon} />
                    </span>
                    <span>
                      <strong>{other.title}</strong>
                      <span>{fr(other.tagline)}</span>
                    </span>
                    <ArrowRight aria-hidden="true" className={styles.otherArrow} />
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/" className={styles.backHome}>
              <ArrowLeft aria-hidden="true" />
              Retour à l&apos;accueil
            </Link>
          </nav>
        </div>
      </section>
    </>
  );
}
