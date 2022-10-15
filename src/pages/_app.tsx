import '../styles/globals.css';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { SeoHeaderProps } from 'src/layouts/SeoHeader';
import { SeoHeader } from '@/layouts';
import { SiteLayout } from '@/layouts';
import React from 'react';
import { AnimatePresence } from 'framer-motion';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
  getSeo?: () => SeoHeaderProps;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

type PagePropsWithLayout = {
  key: string;
  isFirstMount: boolean;
  signedIn: boolean;
  pageProps: {};
};

function MyApp({ Component, pageProps, router }: AppPropsWithLayout) {
  const [isFirstMount, setIsFirstMount] = React.useState(true);
  const [hasConfirmed, setHasConfirmed] = React.useState(false);
  const [signedIn, setSignedIn] = React.useState(false);
  React.useEffect(() => {
    const confirmed = localStorage.getItem('confirmed');
    if (confirmed) {
      setHasConfirmed(true);
      setIsFirstMount(false);
    }
  }, []);

  React.useEffect(() => {
    const handleRouteChange = () => {
      isFirstMount && setIsFirstMount(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  const seoProps = Component.getSeo ? Component.getSeo() : {};

  const pagePropsWithLayout: PagePropsWithLayout = {
    key: router.route,
    isFirstMount: isFirstMount,
    signedIn: signedIn,
    pageProps: pageProps,
  };

  return (
    <div className="foxdale-bg">
      <SeoHeader {...seoProps} />
      <SiteLayout
        hasConfirmed={hasConfirmed}
        setHasConfirmed={setHasConfirmed}
        signedIn={signedIn}
        setSignedIn={setSignedIn}
      >
        <AnimatePresence mode="wait">
          <Component {...pagePropsWithLayout} />
        </AnimatePresence>
      </SiteLayout>
    </div>
  );
}

export default MyApp;
