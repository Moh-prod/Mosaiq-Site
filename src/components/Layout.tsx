import Script from 'next/script';
import type { ReactNode } from 'react';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import ChatWidget from './chat/ChatWidget';
import Footer from './Footer';
import Header from './Header';

/**
 * Chat Crisp facultatif : renseignez la variable d'environnement NEXT_PUBLIC_CRISP_WEBSITE_ID
 * (sur Netlify : Site configuration → Environment variables) pour remplacer l'assistant intégré par Crisp.
 */
const CRISP_WEBSITE_ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;

export default function Layout({ children }: { children: ReactNode }) {
  useRevealOnScroll();

  return (
    <>
      <a href="#contenu" className="skip-link">
        Aller au contenu
      </a>
      <Header />
      <main id="contenu" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      {CRISP_WEBSITE_ID ? (
        <Script id="crisp-chat" strategy="lazyOnload">
          {`window.$crisp=[];window.CRISP_WEBSITE_ID=${JSON.stringify(CRISP_WEBSITE_ID)};(function(){var s=document.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;document.head.appendChild(s);})();`}
        </Script>
      ) : (
        <ChatWidget />
      )}
    </>
  );
}
