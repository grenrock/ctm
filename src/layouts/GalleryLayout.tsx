import React from 'react';

import { motion } from 'framer-motion';
import { animationDuration } from 'src/constants';

type GalleryLayoutProps = {
  children: JSX.Element | JSX.Element[];
};

const contentAnimation = {
  animate: {
    transition: { staggerChildren: 0.1 },
  },
};

const galleryImageAnimation = {
  initial: { y: 0, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      duration: animationDuration,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const GalleryLayout: React.FC<GalleryLayoutProps> = ({ children }) => {
  return (
    <motion.section exit={{ opacity: 0 }}>
      <motion.div
        initial="initial"
        animate="animate"
        variants={contentAnimation}
        className="space-y-12"
      >
        <motion.section
          variants={galleryImageAnimation}
          className="text-gray-700 body-font text-center"
        >
          <div className="container pt-12 mx-auto">
            <main>{children}</main>
          </div>
        </motion.section>
      </motion.div>
    </motion.section>
  );
};

export default GalleryLayout;
