import { motion } from 'framer-motion';
import React from 'react';

const blackBoxAnimation = {
  initial: {
    opacity: 1,
    bottom: 0,
  },
  animate: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
      duration: 1.5,
      ease: [0, 0.05, 0.25, 1],
    },
  },
};

const textContainerAnimation = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
      duration: 1.25,
      ease: [0, 0.05, 0.25, 1],
    },
  },
};

const textAnimation = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 2,
      ease: [0, 0.05, 0.25, 1],
    },
  },
};

type InitialTransitionProps = {
  setInitialTransitionDone: (state: boolean) => void;
};

export const InitialTransition: React.FC<InitialTransitionProps> = ({
  setInitialTransitionDone,
}) => {
  return (
    <motion.div
      className="absolute z-50 flex items-center justify-center w-full h-full ctm-bg"
      initial="initial"
      animate="animate"
      variants={blackBoxAnimation}
      onAnimationStart={() => document.body.classList.add('overflow-hidden')}
      onAnimationComplete={() => {
        document.body.classList.remove('overflow-hidden');
        setInitialTransitionDone(true);
      }}
    >
      <motion.div
        variants={textContainerAnimation}
        className="absolute z-50 flex"
      >
        <motion.div
          variants={textAnimation}
          className="text-3xl font-bold ctm-nav-link"
        >
          Community Team Management
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
