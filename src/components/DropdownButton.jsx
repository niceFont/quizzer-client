import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DropdownButton = ({ children, title }) => {
  const [menu, toggleMenu] = useState(false);
  return (
    <div className="flex justify-center">
      <div className="relative">
        <button
          onBlur={() => toggleMenu(false)}
          onClick={() => toggleMenu(!menu)}
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-300"
        >
          {title}
          <svg className="-mr-1 ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        <AnimatePresence>
          {menu && (
          <motion.div
            initial={{
              opacity: 0,
              y: -100,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              type: 'spring',
              damping: 16,
              stiffness: 400,
            }}
            className="absolute z-50 right-0 w-40 bg-white border rounded-md mt-2 shadow-md"
          >
            {children}
          </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DropdownButton;
