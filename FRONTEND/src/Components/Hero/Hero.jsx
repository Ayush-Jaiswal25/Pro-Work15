import React from 'react'
import './Hero.css'
import {Link} from 'react-router-dom';
import aarrowdown from '../../assets/aarrow-down.gif'
import { heroScroll } from '../../func'

function Hero() {
  return (
    <div id="Hero">
      <div className="hero-description">
        <div className="subHeroDes">
          <h1 data-cursor="-opaque">Providing Work that you need...</h1>
          <h4 data-cursor="-opaque">We offers reliable services for all your household needs. From plumbing fixes to electrical repairs, we've got you covered. Our skilled professionals ensure top-notch workmanship, providing peace of mind. Trust Prowork for all your service needs</h4>
          <Link to='/registration'><button data-cursor='-hidden' className='hero-description-btn'>Register</button></Link>
          <Link to='/services'><button data-cursor='-hidden' className='hero-description-btn servicesbtn'>Services</button></Link>
        </div>
      </div>

      <div className="hero-title">
        <h1>PLACE</h1>
        <h1>TO</h1>
        <h1>WORK</h1>
      </div>

      

      <h5 onLoad={heroScroll} data-cursor='-hidden' className='heroscroll'>SCROLL <img className='aarrow-down' src={aarrowdown} alt="" /> </h5>

    </div>
  )
}

export default Hero