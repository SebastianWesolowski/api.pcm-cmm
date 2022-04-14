import { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>APi pcm-cmm.com</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
