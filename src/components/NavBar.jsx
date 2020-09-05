import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <div style={{ background: '#2D3047' }} className="inset-0 fixed shadow-md px-4 h-12 w-full flex justify-center items-center">
    <div style={{ background: '#2D3047' }} className=" text-white flex items-center fixed shadow-md justify-between  w-8/12 px-4 h-12 bg-red-500">
      <div>
        <h1 className="select-none font-semibold text-xl">Quizzer</h1>
      </div>
      <div className="flex">
        <div className="mx-2">
          <Link to="/">Home</Link>
        </div>
        <div className="mx-2">
          <Link to="/create">Create</Link>
        </div>
      </div>
    </div>
  </div>
);

export default NavBar;
