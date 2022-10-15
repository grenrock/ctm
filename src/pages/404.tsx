import { motion } from 'framer-motion';

const contentAnimation = {
  animate: {
    transition: { staggerChildren: 0.1 },
  },
};

const Custom404 = () => {
  return (
    <motion.section exit={{ opacity: 0 }}>
      <motion.div
        initial="initial"
        animate="animate"
        variants={contentAnimation}
        className="space-y-12"
      >
        <div className="pt-32 flex justify-center w-full h-full foxdale-glow-text text-lg font-black">
          Ope. That goes nowhere...
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Custom404;
