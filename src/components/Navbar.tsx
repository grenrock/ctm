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

  const signOut = () => {
    setSignOutClicked(true);
    setTimeout(() => {
      setSignedIn(false);
    }, 1000);
    setCookies('chocolate_chip', '', { maxAge: -69 });
    router.push('/sign-out').then();
  };

  useEffect(() => {
    const token = getCookie('chocolate_chip');
    if (token) {
      setSignedIn(true);
    }
  });

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
            <a className="flex items-center mb-4 font-medium text-white title-font md:mb-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                className="w-10 h-10 text-white foxdale-pink-bg rounded-full foxdale-glow-box"
                viewBox="-6.8 -8 38 38"
              >
                <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" />
              </svg>
              <span className="ml-3 mr-1 text-xl foxdale-glow-text">
                foxdale.gay
              </span>
              <span className="text-xs pb-3 foxdale-glow-text">(beta!)</span>
            </a>
          </Link>
          <nav className="flex flex-wrap items-center space-x-4 justify-center text-base md:ml-auto">
            <Link href="/">
              <a
                className={
                  asPath === '/' ? 'foxdale-glow-text' : 'foxdale-menu-text'
                }
              >
                Home
              </a>
            </Link>
            <Link href="/comics">
              <a
                className={
                  asPath.includes('/comics')
                    ? 'foxdale-glow-text'
                    : 'foxdale-menu-text'
                }
              >
                Comics
              </a>
            </Link>
            <Link href="/characters">
              <a
                className={
                  asPath.includes('/characters')
                    ? 'foxdale-glow-text'
                    : 'foxdale-menu-text'
                }
              >
                Characters
              </a>
            </Link>
            {signedIn && (
              <>
                <Link href="/complain">
                  <a
                    className={
                      asPath.includes('/complain')
                        ? 'foxdale-glow-text'
                        : 'foxdale-menu-text'
                    }
                  >
                    Complain
                  </a>
                </Link>
                <Link
                  href="/sign-out"
                  className={
                    asPath === '/sign-out'
                      ? 'foxdale-glow-text cursor-pointer'
                      : 'foxdale-menu-text cursor-pointer'
                  }
                  onClick={signOut}
                >
                  Sign Out
                </Link>
              </>
            )}
            {!signedIn && (
              <Link href="/sign-up">
                <a
                  className={
                    asPath.includes('/sign-up')
                      ? 'foxdale-glow-text'
                      : 'foxdale-menu-text'
                  }
                >
                  Sign Up
                </a>
              </Link>
            )}
          </nav>
        </div>
      </motion.div>
    </header>
  );
};
