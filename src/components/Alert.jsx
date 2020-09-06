import React from 'react';
import { motion } from 'framer-motion';

const Alert = ({ children }) => (
  <motion.div
    initial={{
      scale: 0,
    }}
    animate={{
      scale: 1,
    }}
    exit={{
      scale: 0,
    }}
    transition={{
      type: 'spring',
      damping: 10,
      stiffness: 150,
    }}
    className="mb-6 -m-2 text-center"
  >
    <div className="p-2">
      <div className="inline-flex items-center bg-white leading-none text-red-600 rounded-full p-2 shadow text-teal text-sm">
        <span className="inline-flex bg-red-600 text-white rounded-full h-6 px-3 justify-center items-center">Error</span>
        <span className="inline-flex text-lg px-2">{children}</span>
      </div>
    </div>
  </motion.div>
);

export default Alert;
