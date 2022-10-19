import React from 'react';

import './styles.scss';

function Navbar() {
  return (
    <div className="container">
      <div className="navbar">
        <div>
          <a href="/"><h2 className="logo">MOVIE PIONEER.</h2></a>
        </div>
        <div>
          <a className='navLink' href="/">HOME</a>
          <a className='navLink' href="/movies">MOVIES</a>
          <a className='navLink' href="/movies/stats">STATS</a>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
