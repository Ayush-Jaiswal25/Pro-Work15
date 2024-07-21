import React, { useContext, useState } from 'react'
import './Success.css'
import toast from 'react-hot-toast';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import {useSearchParams} from 'react-router-dom'
import { MyContext } from '../../ContextAPI.jsx';



export let vicecity;
function Success() {

  const { signupUser, setsignupUser, removesignupUser, } = useContext(MyContext);

  const [query] = useSearchParams();
  console.log(query.get("payment_id"))

  window.onload = function(){
    setTimeout(() => { toast.success("Payment successfull") }, 500);
    
    // console.log(signupUser.signupusernum)
    // const paymentData = signupUser.signupusernum
    // axios.post('http://localhost:3000/prowork/Founder', {paymentData})
    
  }
  
  return (
    <div id='Success'>
      <Helmet><title>Payment Successful</title></Helmet>
      <h1 className='successh1'>Payment Successful</h1>
      <h3 className='successh3'><span className='payID'>Payment ID:</span> {query && query.get("payment_id")}</h3>
      <button className='home404 suc404'><a href='/'>Home</a></button>
      
      
    </div>
    
  )
}

export default Success