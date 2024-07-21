import React from 'react'
import { Helmet } from 'react-helmet'

import './About.css'

import linkin from '../../assets/linkedin.svg'

function About() {
  return (
    <div id='About'>
      <Helmet><title>Pro Work - About</title></Helmet>

      <div className="about-text">
        <h1 className='about-title'>About Us</h1>
        <p className='about-p'>ProWork - This name stands for our strenght, wisdom and believe to great.</p>
      </div>

      <div className="about-content">
        <h2 className="founder">Founders Team</h2>
        <div className="founder-box">

          <div className="founders-div Harshika">
            <div className="Harshika-photo"><div className="founder-photo"></div></div>
            <h4 className='Harshika-title foun-title'>Harshika Yadav</h4>
            <h4 className='Harshika-title foun-title1'>Co-Founder and CEO</h4>
            <div className="Harshika-des2 des2"><h6>"Success is the direct result of your patience"</h6></div>
            <a href="https://www.linkedin.com/in/ayush-jaiswal25/"><img className='j link' src={linkin} alt="" /></a>
          </div>

          <div className="founders-div Ayush">
            <div className="Ayush-photo "><div className="founder-photo"></div></div>
            <h4 className='Ayush-title foun-title'>&nbsp;&nbsp;&nbsp;Ayush Jaiswal&nbsp;&nbsp;&nbsp;</h4>
            <h4 className='Ayush-title foun-title1'>Co-Founder and CTO</h4>
            <div className="Ayush-des2 des2"><h6>"I always believe i will do great in life"</h6></div>
            <a href="https://www.linkedin.com/in/ayush-jaiswal25/"><img className='j link' src={linkin} alt="" /></a>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default About