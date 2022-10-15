import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const contentAnimation = {
  animate: {
    transition: { staggerChildren: 0.1 },
  },
};

const Success = () => {
  return (
    <motion.section exit={{ opacity: 0 }}>
      <motion.div
        initial="initial"
        animate="animate"
        variants={contentAnimation}
        className="space-y-12"
      >
        <div className="pt-32 flex justify-center w-full h-full foxdale-glow-text text-lg font-black">
          Success! Your temporary password is
        </div>
        <div className="flex justify-center w-full h-full foxdale-glow-text text-xl font-black">
          {localStorage.getItem('tmp')}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Success;
