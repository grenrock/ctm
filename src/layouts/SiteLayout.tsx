import React from 'react';
import { Navbar } from '@/components';
import { SplashPage } from '@/components';

type SiteLayoutProps = {
  hasConfirmed: boolean;
  setHasConfirmed: (state: boolean) => void;
  signedIn: boolean;
  setSignedIn: (state: boolean) => void;
  children: JSX.Element | JSX.Element[];
};

export const SiteLayout: React.FC<SiteLayoutProps> = ({
  hasConfirmed,
  setHasConfirmed,
  signedIn,
  setSignedIn,
  children,
}) => {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    setTimeout(
      () => {
        setLoading(false);
      },
      hasConfirmed ? 500 : 3000,
    );
  }, [hasConfirmed]);
  if (loading) {
    return (
      <div className="absolute z-50 flex items-center justify-center w-full h-full foxdale-bg text">
        <div className="loading">
          <div className="bubble">F</div>
          <div className="bubble">O</div>
          <div className="bubble">X</div>
          <div className="bubble">Y</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col min-h-screen foxdale-bg">
        {hasConfirmed && (
          <div>
            <Navbar signedIn={signedIn} setSignedIn={setSignedIn} />
            <main className="flex-1">{children}</main>
            {/*<Footer />*/}
          </div>
        )}
        {!hasConfirmed && <SplashPage setHasConfirmed={setHasConfirmed} />}
      </div>
    );
  }
};

export default SiteLayout;
