import React from 'react';
import {Button} from 'antd';

import './home.scss';

function Home() {
  return (
    <div className="homeContainer">
      <div className='overlay'>
        <div className='content'>
          <h1 className="logo">MOVIE PIONEER.</h1>
          <p>Aids you in your quest for the movie of your dreams.</p>
          <a href="/movies"><Button className="mainAction" size="large">Discover</Button></a>
        </div>
      </div>
    </div>    
  );
}

export default Home