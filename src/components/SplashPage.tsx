import React from 'react';
import { motion } from 'framer-motion';

type SplashPageProps = {
  setHasConfirmed: (state: boolean) => void;
};

const textBoxAnimation = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 0,
    transition: {
      duration: 1.5,
      ease: [0.87, 0, 0.13, 1],
    },
  },
};

export const SplashPage: React.FC<SplashPageProps> = ({ setHasConfirmed }) => {
  // Scroll user to top to avoid showing the footer

  const [hasClicked, setHasClicked] = React.useState(false);

  return (
    <div className="absolute z-50 flex items-center justify-center w-full h-full foxdale-bg">
      <motion.div
        className="text-center"
        initial="initial"
        animate={hasClicked ? 'animate' : ''}
        variants={textBoxAnimation}
        onAnimationStart={() => document.body.classList.add('overflow-hidden')}
        onAnimationComplete={() => {
          localStorage.setItem('confirmed', 'yes, user is confirmed gay');
          setHasConfirmed(true);
        }}
      >
        <div>
          <text
            className="text-3xl font-bold text-gray-500"
            textAnchor="middle"
            x="50%"
            y="50%"
            style={{ fill: 'url(#pattern)' }}
          >
            18+ Only
          </text>
        </div>
        <div>
          <button
            className="text-gray-500 underline"
            onClick={() => {
              setHasClicked(true);
            }}
            style={{ outline: 'none' }}
          >
            <text
              className="text-3xl font-bold"
              textAnchor="middle"
              x="50%"
              y="50%"
              style={{ fill: 'url(#pattern)' }}
            >
              Enter
            </text>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
