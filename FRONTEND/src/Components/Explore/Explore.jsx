import React from 'react'
import './Explore.css'
import { Helmet } from 'react-helmet'
function Explore() {
  return (
    <div id='Explore'>
      <Helmet><title>Pro Work - Explore</title></Helmet>
      <div className="explore-text">
        <h1 className='explore-title'>Explore</h1>
        <p className='explore-p'>We are here to provide you the best of work at the most affordable price on just one click, no hazard of walking out and finding the right person for your work, because we have already done that for you. At ProWork we keep experienced workers to satisfy your daily problems. </p>
      </div>
      <div className="explore-content">
        <div data-cursor-stick="#explore-idea" data-cursor='-lg -opaque' className="explore-box1">
          <h1 id='explore-idea'>idea</h1>
          <p className="explore-box1-p">The idea of ProWork begin to grow in the mind of our founders when they were college students. It took them a year to build and excute a piecce of idea into an incridiable busniess plan  </p>
        </div>
      </div>
    </div>
  )
}

export default Explore