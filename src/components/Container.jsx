import React from 'react';

const Container = ({ children }) => (
  <div style={{ minHeight: '80em' }} className="mt-32 shadow-lg px-12 py-20 mx-auto sm:w-10/12  lg:w-8/12 bg-white rounded-lg">
    {children}
  </div>
);

export default Container;
