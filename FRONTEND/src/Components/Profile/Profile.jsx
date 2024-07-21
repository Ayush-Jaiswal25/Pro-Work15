import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet'
import toast from 'react-hot-toast';
import axios from 'axios'

import './Profile.css'

import greenwave from '../../assets/green wave.jpg'

import { MyContext } from '../../ContextAPI.jsx';




function Profile() {
  // window.location.reload(false);
  
  const {
    URL,
    Name, setName,
    Email, setEmail,
    HouseAddress, setHouseAddress,
    StreetAddress, setStreetAddress,
    PinCode, setPinCode,

    DataEdited, setDataEdited,
    
    DataUpdatedFirstTime, setDataUpdatedFirstTime, removeDataUpdatedFirstTime,
    SignUpUserID, setSignUpUserID, removeSignUpUserID,
    UserNumber, setUserNumber, removeUserNumber,
    
  } = useContext(MyContext);

  const [error, setErrors] = useState({})
  async function HandleSave(e){
    e.preventDefault(); 

    const ValidationErrors = {}
    if(!Name.trim()){
      ValidationErrors.Name = "Name is Required"
    }
    if(!Email.trim()){
      ValidationErrors.Email = "Email is Required"
    }else if(!/\S+@\S+\.\S+/.test(Email)){
      ValidationErrors.Email = "Email is not valid"
    }
    if(!HouseAddress.trim()){
      ValidationErrors.HouseAddress = "House Address is Required"
    }
    if(!StreetAddress.trim()){
      ValidationErrors.StreetAddress = "Street Address is Required"
    }
    if(!PinCode){
      ValidationErrors.PinCode = "Pin code is Required"
    }else if(PinCode.length > 7){
      ValidationErrors.PinCode = "Pin code is must be 6 digit"
    }
    setErrors(ValidationErrors)
    if(Object.keys(ValidationErrors).length === 0){

    setDataUpdatedFirstTime('isDataCreated', true,{maxAge: 3600*24*21});
    axios.post(`${URL}/prowork/userdetails`, {Name, Email, HouseAddress, StreetAddress, PinCode, SignUpUserID:SignUpUserID.SignUpUserID})
    .then(function (response){ setTimeout(() => { toast.success("Information stored successfully") }, 700); })
    }
  }
  async function bv(){
    setDataEdited(true)
  }

  async function HandleEdit(e){
    e.preventDefault();
    const ValidationErrors = {}
    if(!Name.trim()){
      ValidationErrors.Name = "Name is Required"
    }
    if(!Email.trim()){
      ValidationErrors.Email = "Email is Required"
    }else if(!/\S+@\S+\.\S+/.test(Email)){
      ValidationErrors.Email = "Email is not valid"
    }
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

    axios.patch(`${URL}/prowork/userdetails`, {Name, Email, HouseAddress, StreetAddress, PinCode, SignUpUserID:SignUpUserID.SignUpUserID})
    .then(function (response){
      console.log(response)
      setDataEdited(false)
      setTimeout(() => { toast.success("Information updated successfully") }, 700);
    })
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
  

  return (
    <div id="Profile">
      <Helmet><title>Pro Work - Profile</title></Helmet>
      <div className="profile-content">
        <h1 className='profile-mainTitle'>Users Profile</h1>

        <form className='profile-form' noValidate>
          <div className="personalInfo">
            <h1 className='profile-h1'>Personal Info</h1>

            <div className='profile-lainput'>
              <label className='profile-label' htmlFor="">Name</label> 
              {DataUpdatedFirstTime.isDataCreated?(<div>{DataEdited?(<div><input value={Name} className='profile-input' onChange={(e) =>setName(e.target.value)} type="text" />{error.Name && <span className='errormassDiv'>{error.Name}</span>}</div>):(<p className="profile-input">{Name}</p>)}</div>):(<div><input placeholder='Enter your name' className='profile-input' onChange={(e) =>setName(e.target.value)} type="text" />{error.Name && <span className='errormassDiv'>{error.Name}</span>}</div>)}                 
            </div>

            <div className='profile-lainput'>
              <label className='profile-label' htmlFor="">Email</label> 
              {DataUpdatedFirstTime.isDataCreated?(<div>{DataEdited?(<div><input value={Email} className='profile-input' onChange={(e) =>setEmail(e.target.value)} type="text" />{error.Email && <span className='errormassDiv'>{error.Email}</span>}</div>):(<p className="profile-input">{Email}</p>)}</div>):(<div><input placeholder='Enter your Email' className='profile-input' onChange={(e) =>setEmail(e.target.value)} type="text" />{error.Email && <span className='errormassDiv'>{error.Email}</span>}</div>)}                 
            </div>

            <div className='profile-lainput'>
              <label className='profile-label' htmlFor="">Phone no.</label>
              <label className='profile-input phnum' htmlFor="">+{UserNumber.UserNumber}</label>
            </div>
          </div>

          <div className="homeaddress">
            <h1 className='profile-h1'>Home Address</h1>

            <div className='profile-lainput'>
              <label className='profile-label' htmlFor="">House Address</label> 
              {DataUpdatedFirstTime.isDataCreated?(<div>{DataEdited?(<div><input value={HouseAddress} className='profile-input' onChange={(e) =>setHouseAddress(e.target.value)} type="text" />{error.HouseAddress && <span className='errormassDiv'>{error.HouseAddress}</span>}</div>):(<p className="profile-input">{HouseAddress}</p>)}</div>):(<div><input placeholder='Enter your House Address' className='profile-input' onChange={(e) =>setHouseAddress(e.target.value)} type="text" />{error.HouseAddress && <span className='errormassDiv'>{error.HouseAddress}</span>}</div>)}                 
            </div>

            <div className='profile-lainput'>
              <label className='profile-label' htmlFor="">Landmark</label> 
              {DataUpdatedFirstTime.isDataCreated?(<div>{DataEdited?(<div><input value={StreetAddress} className='profile-input' onChange={(e) =>setStreetAddress(e.target.value)} type="text" />{error.StreetAddress && <span className='errormassDiv'>{error.StreetAddress}</span>}</div>):(<p className="profile-input">{StreetAddress}</p>)}</div>):(<div><input placeholder='Locality or Landmark' className='profile-input' onChange={(e) =>setStreetAddress(e.target.value)} type="text" />{error.StreetAddress && <span className='errormassDiv'>{error.StreetAddress}</span>}</div>)}                 
            </div>

            <div className='profile-lainput'>
              <label className='profile-label' htmlFor="">Pin Code</label> 
              {DataUpdatedFirstTime.isDataCreated?(<div>{DataEdited?(<div><input value={PinCode} className='profile-input' onChange={(e) =>setPinCode(e.target.value)} type="number" />{error.PinCode && <span className='errormassDiv'>{error.PinCode}</span>}</div>):(<p className="profile-input">{PinCode}</p>)}</div>):(<div><input placeholder='Enter Pin Code' className='profile-input' onChange={(e) =>setPinCode(e.target.value)} type="number" />{error.PinCode && <span className='errormassDiv'>{error.PinCode}</span>}</div>)}                 
            </div>
          </div>

          {DataUpdatedFirstTime.isDataCreated?(<div>{DataEdited?(<button onClick={(e) => HandleEdit(e)} className='saveDetails'>Update</button>):(<label onClick={bv} className="userAccountEdit">Edit Details</label>)}</div>):(<button onClick={(e) => HandleSave(e)} className='saveDetails'>Save</button>)}
        </form>
      </div>

      <img className='profile-greenwave' src={greenwave} alt="" />
    </div>
  )
}

export default Profile