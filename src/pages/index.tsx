import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Seo from '@/components/Seo';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import Faq from '@/components/sections/Faq';
import Hero from '@/components/sections/Hero';
import Portfolio from '@/components/sections/Portfolio';
import Pricing from '@/components/sections/Pricing';
import Process from '@/components/sections/Process';
import QuoteSection from '@/components/sections/QuoteSection';
import Services from '@/components/sections/Services';
import Testimonials from '@/components/sections/Testimonials';
import { faqs } from '@/data/faq';
import { offers } from '@/data/offers';
import { processSteps } from '@/data/process';
import { projects } from '@/data/projects';
import { services, toSummary } from '@/data/services';
import { site } from '@/data/site';
import { testimonials } from '@/data/testimonials';
import { faqJsonLd, organizationJsonLd, websiteJsonLd } from '@/lib/seo';

// Génération statique : le contenu est lu au moment du build.
// Pour brancher un CMS plus tard, il suffira de modifier cette fonction.
export const getStaticProps = (async () => ({
  props: {
    services: services.map(toSummary),
    projects,
    testimonials,
    offers,
    faqs,
    steps: processSteps,
  },
})) satisfies GetStaticProps;

export default function Home({ services, projects, testimonials, offers, faqs, steps }: InferGetStaticPropsType<typeof getStaticProps>) {
  const featured = projects.find((project) => project.featured) ?? projects[0];

  return (
    <>
      <Seo
        title="MOSAIQ — Sites web, vidéos motion-design & IA au Mali"
        description={site.description}
        path="/"
        jsonLd={[organizationJsonLd(), websiteJsonLd(), faqJsonLd(faqs)]}
      />
      <Hero featured={featured} />
      <Services services={services} />
      <Portfolio projects={projects} />
      <Testimonials testimonials={testimonials} />
      <About />
      <Process steps={steps} />
      <Pricing offers={offers} />
      <QuoteSection offers={offers} />
      <Faq faqs={faqs} />
      <Contact />
    </>
  );
}
