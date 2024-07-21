import React, { useState, useContext } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import {Link, Route, Routes } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie'
import { AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import OtpInput from 'otp-input-react'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'

import './Body.css'
import './cursor.css'
import './cursor.js'

import Close from '../../assets/close.png';

import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import Service from '../Service/Service';
import About from '../About/About';
import Explore from '../Explore/Explore';
import Profile from '../Profile/Profile.jsx'
import Home from '../Home/Home'
import WorkProfile from '../Work Profile/WorkProfile.jsx'
import Registration from '../Registration/Registration.jsx'
import ProtectedRoutes from '../ProtectedRoutes.jsx';
import Error404 from '../Error404/Error404.jsx';
import Privacy from '../Privacy/Privacy.jsx';
import Terms from '../Terms/Terms.jsx';
import Category from '../Category/Category.jsx';
import Success from '../Success/Success.jsx';
import Failed from '../Failed/Failed.jsx';
import MyBookings from '../MyBookings/MyBookings.jsx';

import { MyContext } from '../../ContextAPI.jsx';
import { appwriteSendOTP, appwriteSubmitOTP, appwriteLogOUT, sessionId } from '../../../Appwrite.jsx';

export function closeUserNav(){
  const userNav = document.getElementById('userNav');
  userNav.classList.remove('user-nav-show');
  userNav.classList.add('hide'); 
}

export let UsersNumber, Temp_OTP_Value ;

function Body() {
  const {
    URL,
    PhoneNumber, setPhoneNumber,
    LoginFirst,
    removeDataUpdatedFirstTime,
    removeBankDataUpdatedFirstTime,
    setSessionID, removeSessionID,
    SignUpUserID, setSignUpUserID, removeSignUpUserID,
    setUserNumber, removeUserNumber,
    RegisterFirstTime, removeRegisterFirstTime,
    
  } = useContext(MyContext);


  const [OTP, setOTP] = useState(true)
  const [OTP_Value, setOTP_Value] = useState("")

  async function sendOTP(){
    UsersNumber = "+" + PhoneNumber;
    toast.success('OTP sent Successfully')
    appwriteSendOTP()
    setTimeout(() => { setOTP(false) }, 500);
  }
  async function resendOTP(){
    toast.success('OTP sent Successfully')
    appwriteSendOTP()
  }
  async function submitOTP(){
    Temp_OTP_Value = OTP_Value;
    appwriteSubmitOTP()

    setTimeout(() => {
      if(sessionId == undefined){ toast.error("Wrong OTP, Please Try Again.") }
      else{
        setTimeout(() =>{
          axios.post(`${URL}/prowork/signup`, {PhoneNumber})
          .then(function (response){
            const waiting = new Promise(resolve => setTimeout(resolve, 1000));
            toast.promise( waiting, { loading: 'Saving...', success: <b className='toaastgreen'>Verification Successfull</b>, error: <b>Wrong OTP, Please Try again</b> }, {duration: 1500} );

            setTimeout(() =>{
              toast('Welcome to Pro Work', { style: { border: '2px solid rgb(1, 141, 112)', padding: '12px', fontSize: '1.2rem', color: 'rgb(1, 141, 112)', position: "bottom-center"} }, {duration: 2000},);
            }, 2700)

            if(response.data._id){
              setSignUpUserID('SignUpUserID', response.data._id,{maxAge: 3600*24*21})
              setUserNumber('UserNumber', response.data.PhoneNumber,{maxAge: 3600*24*21})
            }else{
              setSignUpUserID('SignUpUserID', response.data[0]._id,{maxAge: 3600*24*21})
              setUserNumber('UserNumber', response.data[0].PhoneNumber,{maxAge: 3600*24*21})
            }
            setTimeout(() => {
              
              setSessionID('SessionID', sessionId,{maxAge: 3600*24*21})
            }, 2500);
            setOTP(true)
            unBLUR()
          })
        }, 200)
      }
    }, 300);     
  }
  async function logOut(){
    appwriteLogOUT()

    const waiting = new Promise(resolve => setTimeout(resolve, 1000));
    toast.promise( waiting, { loading: 'Logging Out..', success: <b className='toaastred'>Logged Out</b>, error: <b>Something went wrong, try again</b>, }, {iconTheme: {primary: 'red'}} );

    setTimeout(() =>{
      removeSessionID('SessionID')
      removeSignUpUserID('SignUpUserID')
      removeUserNumber('UserNumber')
      removeRegisterFirstTime('isRegister')
      removeDataUpdatedFirstTime('isDataCreated')
      removeBankDataUpdatedFirstTime('isBankDataCreated')
      setOTP(true)
      setPhoneNumber("91")
      setOTP_Value(null)
    }, 2500)
  }

  if(LoginFirst == true){
    setTimeout(() =>{
      toast.error('Login First');
      setTimeout(() =>{ navSignUpBtn() }, 800)
    }, 800)
  }

  function SignCross(){
    const signINUP = document.getElementById('signINUP');
    const BodyRoutes = document.getElementById('Body-routes');
    signINUP.classList.add('signinup-move-up')
    signINUP.classList.remove('signinup-move-down')
    BodyRoutes.classList.remove('blurr')
    BodyRoutes.classList.add('nonblurr')
  }

  function unBLUR(){
    const BodyRoutes = document.getElementById('Body-routes');
    BodyRoutes.classList.remove('blurr')
    BodyRoutes.classList.add('nonblurr')
  }

  return (
    <CookiesProvider defaultSetOptions={{ path: '/prowork' }}>
      <AnimatePresence>
        <div id="Body">
          <Helmet><title>Pro Work - Home</title></Helmet>
          <Toaster/>

          {OTP?
          (
          <div id='signINUP' className='signIn-signUp'>
            <div id='SignCross' className="sign-cross"> <img className='sign-close' onClick={SignCross} src={Close} alt="" /> </div>
            <h2 className='sign-h2'>Sign Up/ Sign In</h2>
            <div className='sign-form'>
              <div className='signlabelinput'><PhoneInput inputStyle={{color:'green'}} country={'in'} value={PhoneNumber} onChange={setPhoneNumber} /></div>
              <button className='sign-form-button' onClick={sendOTP} >Send OTP</button>
            </div>
          </div>
          ):
          (
          <div className="otp-main-parent">
            <div className="otpmain">
              <h1>Verify OTP</h1>
              <OtpInput inputStyles={{color:'green',}}  className='otpInput otpInputDesktop' value={OTP_Value} onChange={setOTP_Value} OTPLength='6' otpType='number' disabled={false} autoFocus></OtpInput>
              <OtpInput inputStyles={{color:'green', height:'20%', width:'20%'}}  className='otpInput otpInputPhone' value={OTP_Value} onChange={setOTP_Value} OTPLength='6' otpType='number' disabled={false} autoFocus></OtpInput>
              <button className='sign-form-button otpbutton' onClick={submitOTP}>Submit</button>
              <p className='otpp'>Did not recive?<a className='otppp' onClick={resendOTP} >Resend again</a></p>
            </div>
          </div>
          )}

          {SignUpUserID.SignUpUserID ? 
          (
          <div id='userNav' className="user-nav">
            <ul className='no-bullets'>
              <img className='closeUserNav' onClick={closeUserNav} src={Close} alt="" />
              <Link to='/profile'><li className='userNavProfile' onClick={closeUserNav}>Profile</li></Link>
              {RegisterFirstTime.isRegister?(<Link to='/work-profile'><li onClick={closeUserNav}>Funds</li></Link>):("")}
              <Link to='/mybookings'><li onClick={closeUserNav}>Bookings</li></Link>
              <Link to='/'><li onClick={logOut}>Log out</li></Link>
            </ul>
          </div> 
          )
          :
          ("")
          }

          <Navbar/>

          <div id='Body-routes' className="body-routes">
            <Routes location={location} key={location.pathname} >
              <Route path='/' element={<Home/>}/>
              <Route path='/services' element={<Service/>}/>
              <Route path='/explore' element={<Explore/>}/>
              <Route path='/about' element={<About/>}/>
              <Route path='/terms' element={<Terms/>}/>
              <Route path='/privacy-policy' element={<Privacy/>}/>
              <Route path='/:error404' element={<Error404/>}/>
              <Route path='/registration' element={<Registration/>}/>

              <Route element={<ProtectedRoutes/>}>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/work-profile' element={<WorkProfile/>}/>
                <Route path='/mybookings' element={<MyBookings/>}/>
                <Route path='/payment_success' element={<Success/>}/>
                <Route path='/payment_failed' element={<Failed/>}/>
              </Route>
              <Route path='/services/:category' element={<Category/>}/>
            </Routes>
          </div>

          <Footer/>
        </div>
      </AnimatePresence>
    </CookiesProvider>
  )
}

export default Body