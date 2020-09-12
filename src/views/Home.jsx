/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const containerVariants = {
    before: {},
    after: { transition: { staggerChildren: 0.06 } },
  };

  const colors = {
    0: 'text-purple-400',
    1: 'text-blue-400',
    2: 'text-red-400',
    3: 'text-green-400',
    4: 'text-yellow-400',
    5: 'text-orange-400',
    6: 'text-gray-400',
  };
  const letterVariants = {
    before: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring',
        damping: 16,
        stiffness: 200,
      },
    },
    after: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 16,
        stiffness: 200,
      },
    },
  };
  return (
    <div className="mt-12 flex flex-col items-center">
      <motion.div
        center="y"
        height={26}
        width="100%"
        background=""
        style={{
          fontFamily: 'Montserrat, Work Sans, sans-serif',
          fontWeight: 'bold',
          letterSpacing: '-0.04em',
          fontSize: 80,
          display: 'flex', // Set the display value to flex
          justifyContent: 'center', // Center all children elements on the x axis
        }}
        variants={containerVariants}
        initial="before"
        animate="after"
      >
        {'QUIZZER'.split('').map((letter, index) => (
          <motion.div
            key={index}
            width="auto"
            height={26}
            className={`${colors[index]} font-extrabold`}
            style={{
              position: 'relative',
              textShadow: [
                '5px 5px 0px gray',
              ],
            }}
            variants={letterVariants}
          >
            {letter}

          </motion.div>
        ))}
      </motion.div>
      <div className="w-full flex items-center justify-center">
        <span className="font-semibold text-xl lg:text-2xl text-gray-600">Create awesome Quizzes and test your friends knowledge!</span>
      </div>
      <Link className="mt-10" to="/create">
        <button className="px-12 uppercase transition transform duration-300 ease-in-out hover:rotate-0 hover:scale-110 -rotate-3 bg-purple-600 hover:bg-purple-400 rounded-lg text-white font-bold h-12" type="button">Get Started</button>
      </Link>
    </div>
  );
};

export default Home;
