import React, { useState, useContext, useEffect } from 'react'
import './MyBookings.css'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import { MyContext } from '../../ContextAPI.jsx';

let arxIten;
function MyBookings() {
  const { URL, SignUpUserID, setSignUpUserID, removeSignUpUserID, } = useContext(MyContext);

  const [yg, setyg] = useState(false)

  function Vice(){
    axios.get(`${URL}/mybooking/${SignUpUserID.SignUpUserID}`)
    .then(function(response){
      console.log(response.data)
      arxIten = response.data.map(item =>
        // <div key={item._id}>
        //   <p>{item.Service_Charge}</p>
        //   <span>{item.Total_Charge}</span>
        // </div>    
        <div key={item._id} className='BookNowDiv BookNowNext mybook-body'>
            <div className="includeonly"><h5>Status: Failed/Success</h5></div>
          <div className='allSumary'>
            <div className="wiallsum"><h4>Booking:</h4><h4>{item.Booking_Category}</h4></div>
            <div className="wiallsum"><h4>Date:</h4> <h4>{item.Booking_Date}</h4></div>
            <div className="wiallsum"><h4>Time:</h4> <h4>{item.Booking_Time}</h4></div>
            <div className="wiallsum"><h4>Service Charge:</h4><h4>{item.Service_Charge}</h4></div>
            <div className="wiallsum wiallsumlasts"><h4>Travel Charge:</h4><h4>{item.Total_Charge}</h4></div>
            <div className="wiallsum"><h4>Total Amount:</h4><h4>{item.Total_Charge}</h4></div>
          </div>
        </div>
      )
      xc()
    })
  }

  async function xc(){ setyg(true) }

  return (
    <div id="MyBookings">
      <Helmet><title>Pro Work - My Bookings</title></Helmet>
      <div className="mybookingtitle"><h1>My Bookings</h1></div>

        <button className='viceeee' onClick={Vice}>Vice</button>
      <div className="mybooking-body">
        {yg?(<div>{arxIten}</div>):(<h2>No Booking Done Yet</h2>)}
        
      </div>
    </div>
  )
}

export default MyBookings