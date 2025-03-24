import type { AppContext, AppProps } from 'next/app';
import { useEffect } from 'react';
import App from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Only run on the client
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js', { type: 'module' }) // Service Worker with ES Module
          .then((reg) => {
            console.log('Service Worker registered!', reg);
          })
          .catch((err) => {
            console.error('Service Worker registration failed:', err);
          });
      });
    }
  }, []);

  return <Component {...pageProps} />;
}

// If you need to continue using getInitialProps:
MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default MyApp;
