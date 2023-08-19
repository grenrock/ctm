import React from 'react';
import { motion } from 'framer-motion';
import { PageTitle, InitialTransition, AboutParagraph } from '@/components';
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
        className="space-y-8"
      >
        <PageTitle pageTitle="Community Team Management" description={null} />
        <AboutParagraph>
          Community Team Management’s approach to HOA financial management is
          rooted in the belief that open communication and proactive
          problem-solving are key to a successful partnership. We understand
          that each community has unique needs and challenges, and we are
          committed to working closely with the board to tailor our financial
          management services to meet those needs.
        </AboutParagraph>
        <AboutParagraph>
          We believe in a one-price management fee policy. What this means is
          that all postage, photocopying, and other incidentals are included in
          the quoted management fee. You can trust that the quoted fee will not
          be padded during the year. To keep our costs and your costs low, we
          work remotely and use electronic means for communication and payments
          as much as possible, but our top-of-the-line Vantaca and AvidXchange
          software programs ensure the most secure and comprehensive financial
          reporting and provide the online payment options, owner account
          portals, and easy access to HOA documents.
        </AboutParagraph>
        <AboutParagraph>
          Community Team Management LLC is an employee-owned and operated
          enterprise. Each owner lives in Southern California and has years of
          HOA financial management experience. We are your neighbors and look
          forward to having you as part of our Team.
        </AboutParagraph>
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
