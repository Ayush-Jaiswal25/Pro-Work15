import React from 'react'
import './Home.css'
import Home_Body from '../Home Body/Home_Body.jsx'

import Hero from '../Hero/Hero.jsx';

function Home() {

  return (
    <div id='Home'>
      <Hero/>
      <Home_Body/>
    </div>
  )
}

export default Home