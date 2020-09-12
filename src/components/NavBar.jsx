/* eslint-disable global-require */
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <div style={{ background: '#2D3047' }} className="inset-0 absolute shadow-md px-4 h-12 w-full flex justify-center items-center">
    <div style={{ background: '#2D3047' }} className=" text-white flex items-center absolute shadow-md justify-between w-11/12 md:10/12 lg:w-8/12 px-4 h-12 bg-red-500">
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
        <div className="w-6 flex items-center mx-2">
          <a target="_blank" rel="noreferrer" href="https://github.com/niceFont/quizzer-client">
            <img src={require('../assets/GitHub-Mark-Light-64px.png')} alt="githubImage" />
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default NavBar;
