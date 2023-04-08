import React from 'react';
import { Navbar } from '@/components';

type SiteLayoutProps = {
  signedIn: boolean;
  setSignedIn: (state: boolean) => void;
  children: JSX.Element | JSX.Element[];
};

export const SiteLayout: React.FC<SiteLayoutProps> = ({
  signedIn,
  setSignedIn,
  children,
}) => {
    return (
      <div className="flex flex-col min-h-screen ctm-bg">
          <div>
            <Navbar signedIn={signedIn} setSignedIn={setSignedIn} />
            <main className="flex-1">{children}</main>
            {/*<Footer />*/}
          </div>
      </div>
    );
};

export default SiteLayout;
