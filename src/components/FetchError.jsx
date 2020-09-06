import React from 'react';

const FetchError = () => (
  <div className="flex text-purple-800 flex-col justify-center items-center">
    <span className="font-extrabold text-6xl">Oops.</span>
    <span>There was an error while loading, please try again</span>
  </div>
);

export default FetchError;
