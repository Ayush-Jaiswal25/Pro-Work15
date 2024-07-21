import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import googlePlay from '../../assets/googlePlay.png'
import insta48 from  '../../assets/instagram48.png'
import linked48 from '../../assets/linkedin48.png'
import facebook48 from '../../assets/facebook48.png'

import { heroScrollx } from '../../func'

function Footer() {
  return (
    <div id='Footer'>
        <div className="footer-up">
            <div className="footerr-boxx">
            <div className="footer-box fbox1">
                <h3 className='footer-boxh3'>Company</h3>
                <Link data-cursor='-hidden' onClick={heroScrollx} to='/about'><h5>About Us</h5></Link>
                <Link onClick={heroScrollx}  to='/terms'><h5>Terms & Conditions</h5></Link>
                <Link onClick={heroScrollx}  to='/privacy-policy'><h5>Privacy policy </h5></Link>
            </div>
            <div className="footer-box fbox2">
                <h3 className='footer-boxh3'>Customers</h3>
                <Link onClick={heroScrollx} to='/services'><h5>Services near you </h5></Link>
                <Link onClick={heroScrollx} to='/reviews'><h5>Reviews</h5></Link>
                <Link onClick={heroScrollx} to='/contact'><h5>Contact Us</h5></Link>
                <h5></h5>
            </div>
            <div className="footer-box fbox3">
                <h3 className='footer-boxh3'>Workers</h3>
                <Link onClick={heroScrollx} to='/registration'><h5>Register for work</h5></Link>
            </div>
            <div className="footer-box fbox4">
                <h3 className='footer-boxh3'>Social Media</h3>
                <img src={insta48} alt="" />
                <img src={linked48} alt="" />
                <img src={facebook48} alt="" />
            </div>
            </div>
            <div className="googleplaydownload">
            <div className="googlePlaytext1">Get the 'ProWork' App on your device</div>
            <div className="appDownload">
                <img data-cursor='-hidden' className='googlePlayIMG' src={googlePlay} alt="" />
                <div className="googlePlaytext2">Download from <br /><span className='Google_Play_Name'>Google Play</span></div>
            </div>
            </div>
        </div>
        <div className="footer-down">
            <div className="footer-office-address">
                <div className="footer-downBox">Prayagraj Civil Lines Main market</div>
                <div className="footer-downBox">+910000000000</div>
                <div className="footer-downBox">prowork24.7customercare@gmail.com</div>
            </div>
            <div className="footercopyright">Copyright @ 2024 | ProWork - All Rights Reserved</div>
        </div>
    </div>
  )
}

export default Footer