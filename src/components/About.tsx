import { motion } from 'framer-motion';
import { animationDuration } from 'src/constants';
import React from 'react';

type AboutPageImageElementProps = {
  src: string;
  caption: string;
};

const paragraphAnimation = {
  initial: { y: -10, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: animationDuration,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const imageAnimation = {
  initial: { y: -10, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: animationDuration,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const AboutHeader: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <h1 className="ctm-nav-link text-4xl font-black text-gray-600 text-center mb-5">
      {props.children}
    </h1>
  );
};

export const AboutParagraph: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <motion.div
      animate="animate"
      initial="initial"
      variants={paragraphAnimation}
      className="mx-auto px-8 text-base lg:w-1/2 md:w-2/3 leading-relaxed text-gray-500"
    >
      {props.children}
    </motion.div>
  );
};

export const AboutImage: React.FC<AboutPageImageElementProps> = ({
  src,
  caption,
}) => {
  return (
    <>
      <motion.div
        animate="animate"
        initial="initial"
        variants={imageAnimation}
        className="about-img"
      >
        <img src={src} />
      </motion.div>

      <p className="about-caption">{caption}</p>
    </>
  );
};
