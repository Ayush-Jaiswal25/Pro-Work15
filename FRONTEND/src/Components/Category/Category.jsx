import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import toast from 'react-hot-toast'

import './Category.css'

import Close from '../../assets/close.png';
import aarrowdown from '../../assets/aarrow-down.gif'
import Edit from '../../assets/Edit.png'
import ProWorkLogo from '../../../public/android-chrome-512x512.png'

import { MyContext } from '../../ContextAPI.jsx';
import { navSignUpBtn } from '../Navbar/Navbar.jsx';
import { categoryList } from '../../assets/CategoryList'


export let CategoryURL;
function Category() {
  CategoryURL = window.location.href;
  const {
    URL,
    Name, setName,
    setEmail,
    HouseAddress, setHouseAddress,
    StreetAddress, setStreetAddress,
    PinCode, setPinCode,
    DataEdited, setDataEdited,
    SignUpUserID,
    DataUpdatedFirstTime, setDataUpdatedFirstTime,
    SessionID,
    UserNumber,
  } = useContext(MyContext);

  function closecatageryUserNav(){
    const BodyRoutes = document.querySelector('.CategoryBlock');
    const operate = document.querySelector('.operate');
    BodyRoutes.classList.remove('blurr')
    operate.classList.remove('blurr')
    BodyRoutes.classList.add('nonblurr')
    operate.classList.add('nonblurr')
    setBookNow(false)
    setDataEdited(false)
  }

  const [ BookNow, setBookNow] = useState(false);
  const [ BookNowNext, setBookNowNext] = useState(false);
  const [error, setErrors] = useState({})

  let j = '100', k = Name, bookingcategory='', totalc='', servicec='', travelc='';

  

  function checkOut({name, amount, bookingcategory, totalc, servicec, travelc}){
    const currentDate = new Date();
    const BookingDate = currentDate.toLocaleDateString();
    const BookingTime = currentDate.toLocaleTimeString();
    axios.post(`${URL}/mybooking`, {BookingDate, BookingTime, bookingcategory, totalc, servicec, travelc, SignUpUserID:SignUpUserID.SignUpUserID})
    
    
    axios.post(`${URL}/payment/checkout`, {name, amount})
    .then(function (response){
      let options = {
        "key": "rzp_test_YlsIMKyGXhS3ih",
        "amount": response.data.order.amount,
        "currency": "INR",
        "name": "Pro Work",
        "description": "Test Transaction",
        "image": ProWorkLogo,
        "order_id": response.data.order.id,
        "callback_url": "http://localhost:3000/payment/payment-verification",
        "prefill": {
          "name": "Ayush Jaiswal",
          "email": "ayush@gmail.com",
          "contact": "9000090000"
        },
        "notes": {
          "address": "Razorpay Corporate Office"
        },
        "theme": {
          "color": "#052716"
        }
      };
      var rzp1 = new Razorpay(options);
      rzp1.open()

    })

  }

 
  function ServiceBooking(){
    if(SessionID.SessionID == undefined){
      toast.error('Login First') 
      setTimeout(() => { navSignUpBtn() }, 800);
    }else{
      setBookNow(true)
      const BodyRoutes = document.querySelector('.CategoryBlock');
      const operate = document.querySelector('.operate');
      BodyRoutes.classList.add('blurr')
      operate.classList.add('blurr')
      BodyRoutes.classList.remove('nonblurr')
      operate.classList.remove('nonblurr')
    }
  }
  function ServiceBookingNext(){
    const ValidationErrors = {}
    if(!HouseAddress.trim()){
      ValidationErrors.HouseAddress = "House Address is Required"
    }
    if(!StreetAddress.trim()){
      ValidationErrors.StreetAddress = "Street Address is Required"
    }
    if(!PinCode){
      ValidationErrors.PinCode = "Pin code is Required"
    }
    else if(PinCode.length > 7){
      ValidationErrors.PinCode = "Pin code is must be 6 digit"
    }

    setErrors(ValidationErrors)
    if(Object.keys(ValidationErrors).length === 0){
    setBookNow(false)
    setTimeout(() => { setBookNowNext(true) }, 500);
    if(DataEdited){
      axios.patch(`${URL}/prowork/userdetails`, {HouseAddress, StreetAddress, PinCode, SignUpUserID:SignUpUserID.SignUpUserID})
      .then(function (response){
        console.log(response)
        setDataEdited(false)
        toast.success("Address confirmed")
      })
    }
  }
  }
  
  if(!DataEdited){
    axios.get(`${URL}/prowork/userdetails/${SignUpUserID.SignUpUserID}`)
    .then(function (response){
      setDataUpdatedFirstTime('isDataCreated',response.data[0].isDataCreated ,{maxAge: 3600*24*21});
      setName(response.data[0].Name)
      setEmail(response.data[0].Email)
      setHouseAddress(response.data[0].HouseAddress)
      setStreetAddress(response.data[0].StreetAddress)
      setPinCode(response.data[0].PinCode)
    })
    }

    async function EditDe(){
      setDataEdited(true)
    }

    // let random;
    const [ random, setRandom] = useState("");
    function randomInteger(min, max) {
      setRandom(Math.floor(Math.random() * (max - min + 1)) + min);
      console.log(random)
      console.log("heyee")

    }
    
  return (
    <div id="Category">
      <Helmet><title>Pro Work - Category</title></Helmet>

      {categoryList.map((item, index) =>{
        if(CategoryURL == item.URL){
          return(
            <div key={index} className="CategoryBlock">
              <h1 className='CategoryBlock-h1'>Book Our Experienced {item.Category}</h1>
              <div className='catcard-div'>
                <div className="imgcatcard">
                  <img src={item.image} alt="" className="catcard-img-top" />
                </div> 
              </div>

              <div className='service_final'>
                <label className='chooseTile' htmlFor=""> Choose a Service</label>
                <div className='service_final_block'>
                  <table className='service_table'>

                    <tr>
                      <th>Select</th>
                      <th className='Srevice'>Service</th>
                      <th className='price_Range'>Price range</th>
                    </tr>

                    <tr>
                      <td><input className='radioC' type="radio" id="html" name="fav_language" value="HTML" /></td>
                      <td className='table_data'><label for="html">{item.service5}</label></td>
                      <td><h4>{item.service_Price1}</h4></td>
                    </tr>

                    <tr>
                      <td><input className='radioC' type="radio" id="css" name="fav_language" value="CSS" /></td>
                      <td className='table_data'><label onClick={() =>(randomInteger((item.service_Price1_low), (item.service_Price1_high)))} for="css">{item.service1}</label></td>
                      <td><h4>{item.service_Price2}</h4></td>
                    </tr>

                    <tr>
                      <td><input className='radioC' type="radio" id="css" name="fav_language" value="CSS" /></td>
                      <td className='table_data'><label onClick={() =>(randomInteger((item.service_Price1_low), (item.service_Price1_high)))} for="css">{item.service1}</label></td>
                      <td><h4>{item.service_Price2}</h4></td>
                    </tr>

                    <tr>
                      <td><input className='radioC' type="radio" id="css" name="fav_language" value="CSS" /></td>
                      <td className='table_data'><label onClick={() =>(randomInteger((item.service_Price1_low), (item.service_Price1_high)))} for="css">{item.service1}</label></td>
                      <td><h4>{item.service_Price2}</h4></td>
                    </tr>

                    <tr>
                      <td><input className='radioC' type="radio" id="css" name="fav_language" value="CSS" /></td>
                      <td className='table_data'><label onClick={() =>(randomInteger((item.service_Price1_low), (item.service_Price1_high)))} for="css">{item.service1}</label></td>
                      <td><h4>{item.service_Price2}</h4></td>
                    </tr>

                  </table>
                </div>                
                <button className='bookService' onClick={ServiceBooking}>Book Serivce</button>
                {random?(<h2 className='rand_proce'>Rs.{random}</h2>):(<h1></h1>)}
                
              </div>
            </div>          
          )
        }
      })}

      {BookNow?
      (
      <div className='BookNowDiv'>
        <img className='closeUserNav' onClick={closecatageryUserNav} src={Close} alt="" />
        <h2>Confirm Your Address</h2>
        <div className="dropdownPlace">
          <label className='profile-label cala' htmlFor="Place">Select Place:</label>
          <select className='profile-input cain' name="place" id="Place">
            <option value="Civil Lines">Civil Lines</option>
            <option value="Jhunsi">Jhunsi</option>
            <option value="Naini">Naini</option>
            <option value="Mama Bhanja">Mama Bhanja</option>
          </select>
        </div>
        
        <div className='confirm-add'>
          <div>

            <div className='profile-lainput'>
              <label className='profile-label' htmlFor="">House Address</label> 
              {DataUpdatedFirstTime.isDataCreated?(<div>{DataEdited?(<div><input value={HouseAddress} className='profile-input' onChange={(e) =>setHouseAddress(e.target.value)} type="text" />{error.HouseAddress && <span className='errormassDiv'>{error.HouseAddress}</span>}</div>):(<p className="profile-input">{HouseAddress} <img className='Editde' onClick={EditDe} src={Edit} alt="" /> </p>)}</div>):(<div><input placeholder='Enter your House Address' className='profile-input' onChange={(e) =>setHouseAddress(e.target.value)} type="text" />{error.HouseAddress && <span className='errormassDiv'>{error.HouseAddress}</span>}</div>)}                 
            </div>

            <div className='profile-lainput'>
              <label className='profile-label' htmlFor="">Landmark</label> 
              {DataUpdatedFirstTime.isDataCreated?(<div>{DataEdited?(<div><input value={StreetAddress} className='profile-input' onChange={(e) =>setStreetAddress(e.target.value)} type="text" />{error.StreetAddress && <span className='errormassDiv'>{error.StreetAddress}</span>}</div>):(<p className="profile-input">{StreetAddress} <img className='Editde' onClick={EditDe} src={Edit} alt="" /></p>)}</div>):(<div><input placeholder='Locality or Landmark' className='profile-input' onChange={(e) =>setStreetAddress(e.target.value)} type="text" />{error.StreetAddress && <span className='errormassDiv'>{error.StreetAddress}</span>}</div>)}                 
            </div>

            <div className='profile-lainput'>
              <label className='profile-label' htmlFor="">Pin Code</label> 
              {DataUpdatedFirstTime.isDataCreated?(<div>{DataEdited?(<div><input value={PinCode} className='profile-input' onChange={(e) =>setPinCode(e.target.value)} type="text" />{error.PinCode && <span className='errormassDiv'>{error.PinCode}</span>}</div>):(<p className="profile-input">{PinCode} <img className='Editde' onClick={EditDe} src={Edit} alt="" /></p>)}</div>):(<div><input placeholder='Enter Pin Code' className='profile-input' onChange={(e) =>setPinCode(e.target.value)} type="text" />{error.PinCode && <span className='errormassDiv'>{error.PinCode}</span>}</div>)}                 
            </div>

          </div>
          <button className='bookService bookService-next' onClick={ServiceBookingNext}>Next &nbsp; <div className='aarrow-doleft'> <img className='aarrow-down' src={aarrowdown} alt="" /></div></button>
        </div>
      </div>
      ):("")}
      {BookNowNext?
      (
      <div className='BookNowDiv BookNowNext'>
        <div className="finalBookHeading"><h2>Summary</h2></div>
        <div className="finalbookdes"><h3>Service man will reach your home between 2 - 4 hours</h3></div>
          <div className="includeonly"><h5>*Include Service charge only</h5></div>
        <div className='allSumary'>
        {categoryList.map((item, index) =>{
          if(CategoryURL == item.URL){
            return(
              <div key={index} className="CategoryBlock CategoryBlockSummary">
                <div className="wiallsum"><h4>Booking:</h4><h4>{item.Category}</h4></div>
                <div className="wiallsum"><h4>Your contact Number:</h4> <h4>+{UserNumber.UserNumber}</h4></div> 
                <div className="wiallsum"><h4>Service Charge:</h4><h4>{item.Price}</h4></div>
                <div className="wiallsum wiallsumlasts"><h4>Travel Charge:</h4><h4>Rs.{item.Travel}.00</h4></div>
                <div className="wiallsum"><h4>Total Amount:</h4><h4>Rs.{item.PriceAdd+item.Travel}.00</h4></div>
                <button className='bookService bookService-next bookService-nextt' onClick={()=>checkOut({totalc:item.PriceAdd+item.Travel,servicec:item.Price, travelc:item.Travel, name:k, amount:j=(item.PriceAdd+item.Travel)*100, bookingcategory:item.Category})}>Book Now</button>
              </div>          
            )
          }
        })}
        </div>
      </div>
      ):("")}

      
      <h1 className='operate'>We Operate in Civil Lines, Naini, Jhunsi, Mama Bhanja</h1>
        
    </div>
  )
}

export default Category