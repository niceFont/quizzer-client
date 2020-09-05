import React from 'react';
import { motion } from 'framer-motion';

const Tooltip = ({ children }) => (
  <div className="flex relative">
    <motion.div
      exit={{ opacity: 0, top: -60 }}
      initial={{ top: -10, opacity: 0 }}
      animate={{
        opacity: 1,
        top: -60,
        transitionEnd: {
          display: 'none',
        },
      }}
      style={{ top: -20 }}
      className="absolute mx-2"
    >
      <div style={{ bottom: '100%' }} className="bg-black text-white text-xs rounded py-1 px-4 right-0">
        {children}
        <svg className="absolute text-black h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255" xmlSpace="preserve"><polygon className="fill-current" points="0,0 127.5,127.5 255,0" /></svg>
      </div>
    </motion.div>
  </div>
);

export default Tooltip;
