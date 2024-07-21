import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import {motion} from "framer-motion"

import './Navbar.css'

import User from '../../assets/nav_user.png'
import HamMenu from '../../assets/nav_hamMenu.png'
import Close from '../../assets/close.png';

import { MyContext } from '../../ContextAPI.jsx';
import { closeUserNav } from '../Body/Body.jsx';
import { navbarHide } from '../../func'
import { workprofileloadt } from '../Work Profile/WorkProfile.jsx'


export function navSignUpBtn(){
  const signINUP = document.getElementById('signINUP');
  const BodyRoutes = document.getElementById('Body-routes');
  signINUP.classList.add('signinup-move-down')
  signINUP.classList.remove('signinup-move-up')
  BodyRoutes.classList.add('blurr')
  BodyRoutes.classList.remove('nonblurr')
}

function Navbar() {
  
  const [phoneHamCross, setphoneHamCross] = useState(true)
  
  const {
    SessionID, setSessionID, removeSessionID,
    SignUpUserID, setSignUpUserID, removeSignUpUserID,

  } = useContext(MyContext);

  
  
  function phoneNavHam(){
    const navphonelist = document.querySelector('.nav-phone-list')
    navphonelist.classList.add('nav-phone-list-moveDown')
    navphonelist.classList.remove('nav-phone-list-moveUp')
    setphoneHamCross(false)
    closeUserNav()
  }

  function phoneNavClosee(){
    const navphonelist = document.querySelector('.nav-phone-list')
    navphonelist.classList.remove('nav-phone-list-moveDown')
    navphonelist.classList.add('nav-phone-list-moveUp')
    setphoneHamCross(true)
  }

  function UserBtn(){
    const userNav = document.getElementById('userNav');
    userNav.classList.add('user-nav-show');
    userNav.classList.remove('hide');
  }

  async function Withdraw(){
    const walletwthdrawDiv = document.querySelector('.walletwthdrawDiv')
    walletwthdrawDiv.classList.add('walletwiddisplay')
  
  }
  

  return (
    <div onLoad={navbarHide} id='Navbar' className="nav">
      <motion.div className="navbar" id="Navbar" initial={{ y:0, }} animate={{ y:0,}} exit={{y:0}} transition={{duration: 0.3, delay: 2.3}}>
        {workprofileloadt?(<div className="walletDiv">
        <div className="walletAmout">₹100.00</div>
        <div className="walletwthdraw"><label onClick={Withdraw}>Wallet</label></div>
        </div>):("")}
      
        <Link to='/'><div id='PROWORK' className="navbar-left"><h1><b>PRO</b> WORK</h1></div></Link>

        <div className="navbar-right">
          
          <div className="navbar-options-laptop">
            <Link className="jobs-explo" id='JoBs' to="/services">SERVICES</Link>
            <Link className="jobs-explo" id="EXPLORE" to='/explore'>EXPLORE</Link>
            <Link className="jobs-explo" to="/about">ABOUT US</Link>
            {SessionID.SessionID ?(
            <a onClick={UserBtn} data-cursor="-opaque1" data-cursor-stick="#user-btn" id="user-btn"><img src={User} /></a>
            ):(
            <a onClick={navSignUpBtn} data-cursor="-hidden" id='Btn-sign' className='btn-sign'>Sign Up</a>
            )}
          </div>

          <div className="navbar-options-phone">
            {phoneHamCross?(
            <a onClick={phoneNavHam} id="user-btn" className='phoneuserbtn'><img src={HamMenu} /></a>
            ):(
            <img onClick={phoneNavClosee} className='sign-close sign-close-phone' src={Close} alt="" />
            )}
            {SignUpUserID.SignUpUserID ?(
            <a onClick={UserBtn} data-cursor="-opaque1" data-cursor-stick="#user-btn" id="user-btn" className='phone-user-btn'><img src={User} /></a>
            ):(
            <a onClick={navSignUpBtn} data-cursor="-hidden" id='Btn-sign' className='btn-sign phone-btn-sign'>Sign Up</a>
            )}
            <div className='nav-phone-list'>
              <Link onClick={phoneNavClosee} className="phone-jobs-explo" id='' to="/">HOME</Link>
              <Link onClick={phoneNavClosee} className="phone-jobs-explo" id='' to="/services">SERVICES</Link>
              <Link onClick={phoneNavClosee} className="phone-jobs-explo" id="" to='/explore'>EXPLORE</Link>
              <Link onClick={phoneNavClosee} className="phone-jobs-explo" to="/about">ABOUT US</Link>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  )
}

export default Navbar