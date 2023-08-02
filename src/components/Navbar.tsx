import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { getCookie, setCookies } from 'cookies-next';
import { motion } from 'framer-motion';

type NavbarProps = {
  signedIn: boolean;
  setSignedIn: (state: boolean) => void;
};

const headerLinksAnimation = {
  out: {
    opacity: 0,
    transition: {
      duration: 0.7,
    },
  },
  in: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

export const Navbar: React.FC<NavbarProps> = ({ signedIn, setSignedIn }) => {
  const { asPath } = useRouter();
  const router = useRouter();
  const [signOutClicked, setSignOutClicked] = React.useState(false);
  const [signOutComplete, setSignOutComplete] = React.useState(false);

  return (
    <header className="text-gray-700 body-font">
      <motion.div
        animate={signOutClicked ? 'out' : signOutComplete ? 'in' : ''}
        variants={headerLinksAnimation}
        onAnimationComplete={() => {
          setTimeout(() => {
            setSignOutComplete(true);
            signOutClicked
              ? setSignOutClicked(false)
              : setSignOutComplete(false);
          }, 1300);
        }}
      >
        <div className="container flex flex-col flex-wrap items-center p-5 mx-auto md:flex-row">
          <Link href="/">
            <a className="flex items-center mb-4 font-medium text-white title-font md:mb-0 w-12">
              <img src="https://ctm-images-20230408.s3.us-west-1.amazonaws.com/logo.jpg" />
            </a>
          </Link>
          <nav className="flex flex-wrap items-center space-x-4 justify-center text-base md:ml-auto">
            <Link href="/">
              <a className={asPath === '/' ? 'ctm-nav-link' : 'ctm-menu-text'}>
                Home
              </a>
            </Link>
            <Link href="/contact">
              <a
                className={
                  asPath === '/contact' ? 'ctm-nav-link' : 'ctm-menu-text'
                }
              >
                Get a Quote
              </a>
            </Link>
            {!signedIn && (
              <Link href="/sign-in">
                <a
                  className={
                    asPath.includes('/sign-in')
                      ? 'ctm-nav-link'
                      : 'ctm-menu-text'
                  }
                >
                  Sign In
                </a>
              </Link>
            )}
          </nav>
        </div>
      </motion.div>
    </header>
  );
};
