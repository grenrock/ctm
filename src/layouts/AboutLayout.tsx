import { motion } from 'framer-motion';
import React from 'react';
import { animationDuration } from 'src/constants';

type AboutLayoutProps = {
  children: JSX.Element | JSX.Element[];
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

const AboutLayout: React.FC<AboutLayoutProps> = ({ children }) => {
  return (
    <motion.section
      exit={{ opacity: 0 }}
      className="relative text-gray-700 body-font"
    >
      <motion.div
        variants={contentAnimation}
        animate="animate"
        initial="initial"
        className="container py-24 mx-auto"
      >
        <motion.div
          variants={titleAnimation}
          className="flex flex-col w-full mb-12"
        >
          <motion.div
            animate="animate"
            initial="initial"
            variants={titleAnimation}
            className="mx-auto text-base leading-relaxed lg:w-2/3 text-gray-500"
          >
            <main>{children}</main>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default AboutLayout;
