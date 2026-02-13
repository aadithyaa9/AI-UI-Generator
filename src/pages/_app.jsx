import '../styles/globals.css';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Artifex | Natural Language to Perfect Layouts</title>
        <meta name="description" content="Generate production-ready React components with deterministic layouts." />
      </Head>
      <Component {...pageProps} />
    </>
  );
}