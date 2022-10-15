import React from 'react';
import { motion } from 'framer-motion';
import { PageTitle, InitialTransition } from '@/components';
import { application } from 'src/constants';

const contentAnimation = (isFirstMount: boolean) => ({
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: isFirstMount ? 3.35 : 0,
    },
  },
});

const imageSliderAnimation = {
  initial: { y: -20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

type IndexPageProps = {
  isFirstMount: boolean;
  signedIn: boolean;
};

function IndexPage(props: IndexPageProps) {
  const [initialTransitionDone, setInitialTransitionDone] =
    React.useState(false);

  return (
    <motion.section exit={{ opacity: 0 }}>
      {props.isFirstMount && !initialTransitionDone && (
        <InitialTransition
          setInitialTransitionDone={setInitialTransitionDone}
        />
      )}

      <motion.div
        initial="initial"
        animate="animate"
        variants={contentAnimation(props.isFirstMount)}
        className="space-y-12"
      >
        <PageTitle
          pageTitle={props.signedIn ? 'Welcome, cutie' : "Foxdale's Clubhouse"}
          description={null}
        />
        <motion.section
          variants={imageSliderAnimation}
          className="text-gray-700 body-font text-center"
        >
          <div className="image-slider foxdale-glow-box">
            <img src="https://foxdale-images-202205271037.s3.us-west-1.amazonaws.com/shnj-cover+copy.jpg" />
          </div>
        </motion.section>
      </motion.div>
    </motion.section>
  );
}

export default IndexPage;

IndexPage.getSeo = function getSeo() {
  const props = {
    title: application.title,
    description: application.description,
  };
  return props;
};
