import { motion } from 'framer-motion';
import React from 'react';
import { animationDuration } from 'src/constants';

type PageTitleProps = {
  pageTitle: string;
  description: string | null;
};

const contentAnimation = {
  animate: {
    transition: { staggerChildren: 0.1 },
  },
};

const titleAnimation = {
  initial: { y: 0, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: animationDuration,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const PageTitle: React.FC<PageTitleProps> = ({
  pageTitle,
  description,
}) => {
  return (
    <motion.h1
      variants={titleAnimation}
      className="text-6xl font-black text-gray-600 text-center mt-8"
    >
      <span className="foxdale-glow-text">{pageTitle}</span>
      {description && (
        <motion.div
          variants={contentAnimation}
          className="mt-8 text-base font-medium text-gray-500"
        >
          {description || ''}
        </motion.div>
      )}
    </motion.h1>
  );
};
