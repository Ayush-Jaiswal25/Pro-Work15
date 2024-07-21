import React, {useState, useContext} from 'react'
import './Registration.css'
import { Helmet } from 'react-helmet'
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import toast, { Toaster } from 'react-hot-toast';

import { navSignUpBtn } from '../Navbar/Navbar.jsx';
import { MyContext } from '../../ContextAPI.jsx';

function Registration() {

  const {
    URL,
    WhatsAppNumber, setWhatsAppNumber,
    SessionID, setSessionID, removeSessionID,
    RegisterFirstTime, setRegisterFirstTime, removeRegisterFirstTime
    
  } = useContext(MyContext);

  function onRegister(){
    if(SessionID.SessionID == undefined){
      toast.error('Login First') 
      setTimeout(() => { navSignUpBtn() }, 800);
    }else{
    if(RegisterFirstTime.isRegister){
      toast.error("User already registered", {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });
      setWhatsAppNumber("+91")
    }else{
    setRegisterFirstTime('isRegister', true,{maxAge: 3600*24*21});
    axios.post(`${URL}/prowork/register`, {WhatsAppNumber})
    .then(function (response){
      console.log(response.data.WhatsAppNumber)
      const waiting = new Promise(resolve => setTimeout(resolve, 800));
      toast.promise( waiting, { loading: 'Saving...', success: <b className='toaastgreen'>Registration Done</b>, error: <b>Wrong OTP, Please Try again</b> }, {duration: 1000} );

      setTimeout(() => { const wt = document.querySelector('.wa').click() }, 2500);
    })
    }
  }
  }
  return (
    <div id='Registration'>
      <Helmet><title>Pro Work - Registration</title></Helmet>
      <a className='wa' href="https://wa.me/917905099282"><button >Click1</button></a>
      <div className="registrationFrom">

          <div className="registraHead">
          <h2 className='sign-h2 reg-h2'>Share your WhatsApp Number</h2>
          <h2 className='sign-h2 reg-h22'>Our support team will contact you as soon as possible</h2>
          </div>

          <div className='sign-form sign-formx'>
            <div className='signlabelinput'>
              <PhoneInput inputStyle={{color:'green'}} name='numberr' country={'in'} value={WhatsAppNumber} onChange={setWhatsAppNumber} />
            </div>
            <button className='sign-form-button'onClick={onRegister} >Join Us</button>
          </div>

          <div className="regis-tags">
            <div className="gg1">
              <label className='workng-tags g1'>Electrician</label>
              <label className='workng-tags g3'>Cook</label>
            </div>

            <div className="gg3">
              <label className='workng-tags g2'>Labour</label>
              <label className='workng-tags g4'>Priest</label>
            </div>

            <div className="gg2">
              <label className='workng-tags g1'>Tailer</label>
              <label className='workng-tags g3'>Contractor</label>
            </div>

            <div className="gg4">
              <label className='workng-tags g1'>Tutor</label>
              <label className='workng-tags g4'>Plumber</label>
            </div>

            <div className="gg5">
              <label className='workng-tags g2'>Mechanic</label>
              <label className='workng-tags g3'>xyz</label>
            </div>
          </div>

        </div>
    </div>
  )
}

export default Registration