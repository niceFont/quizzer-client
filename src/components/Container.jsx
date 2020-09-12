import React from 'react';

const Container = ({ children }) => (
  <div style={{ minHeight: '80em' }} className="mt-32 max-w-6xl shadow-lg rounded-none md:rounded-lg px-4 md:px-6 lg:px-12 py-20 mx-auto w-full md:w-11/12 lg:w-9/12 bg-white">
    {children}
  </div>
);

export default Container;
