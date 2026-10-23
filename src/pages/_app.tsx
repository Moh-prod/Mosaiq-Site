import type { AppProps } from 'next/app';
import localFont from 'next/font/local';
import Head from 'next/head';
import Layout from '@/components/Layout';
import '@/styles/globals.css';

// Police hébergée avec le site (aucune requête vers Google Fonts) : Plus Jakarta Sans, variable 200–800.
const jakarta = localFont({
  src: '../fonts/PlusJakartaSans-Variable-latin.woff2',
  weight: '200 800',
  style: 'normal',
  display: 'swap',
  fallback: ['system-ui', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
  adjustFontFallback: 'Arial',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <div className={jakarta.className}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </>
  );
}
