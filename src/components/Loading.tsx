import { motion } from 'framer-motion';

const contentAnimation = {
  animate: {
    transition: { staggerChildren: 0.1 },
  },
};

const Loading = () => {
  return (
    <motion.section exit={{ opacity: 0 }}>
      <motion.div
        initial="initial"
        animate="animate"
        variants={contentAnimation}
        className="space-y-12"
      >
        <div className="pt-32 flex justify-center w-full h-full ctm-nav-link text-lg font-black">
          ...
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Loading;
