import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import toast from 'react-hot-toast'

import '../Profile/Profile.css'
import './WorkProfile.css'

import greenwave from '../../assets/green wave.jpg'

import { MyContext } from '../../ContextAPI.jsx';



export let workprofileloadt;


function Profile() {

  workprofileloadt = true;
  
  const {
    URL,
    AccountHolderName, setAccountHolderName,
    BankName, setBankName,
    AccountNumber, setAccountNumber,
    AccountIFSC_code, setAccountIFSC_code,

    BankDataEdited, setBankDataEdited,
    
    BankDataUpdatedFirstTime, setBankDataUpdatedFirstTime, removeBankDataUpdatedFirstTime,
    SignUpUserID, setSignUpUserID, removeSignUpUserID,
    UserNumber, setUserNumber, removeUserNumber,
    
  } = useContext(MyContext);

  const [error, setErrors] = useState({})

  async function HandleBankSave(e){
    e.preventDefault(); 
    const ValidationErrors = {}
    if(!AccountHolderName.trim()){
      ValidationErrors.AccountHolderName = "Name is Required"
    }
    if(!BankName.trim()){
      ValidationErrors.BankName = "Bank Name is Required"
    }
    if(!AccountNumber){
      ValidationErrors.AccountNumber = "AccountNumber is Required"
    }else if(AccountNumber.length > 18 || AccountNumber.length < 8){
      ValidationErrors.AccountNumber = "AccountNumber invalid"
    }
    if(!AccountIFSC_code.trim()){
      ValidationErrors.AccountIFSC_code = "AccountIFSC_code is Required"
    }
    setErrors(ValidationErrors)
    if(Object.keys(ValidationErrors).length === 0){
    setBankDataUpdatedFirstTime('isBankDataCreated', true,{maxAge: 3600*24*21});
    axios.post(`${URL}/prowork/bankdetails`, {AccountHolderName, BankName, AccountNumber,  AccountIFSC_code, SignUpUserID:SignUpUserID.SignUpUserID})
    .then(function (response){ setTimeout(() => { toast.success("Information stored successfully") }, 700); })
    }
  }
  async function bankEdit(){
    setBankDataEdited(true)
  }

  async function HandleBankEdit(e){
    e.preventDefault();
    const ValidationErrors = {}
    if(!AccountHolderName.trim()){
      ValidationErrors.AccountHolderName = "Name is Required"
    }
    if(!BankName.trim()){
      ValidationErrors.BankName = "Bank Name is Required"
    }
    console.log(AccountNumber.length)
    if(!AccountNumber){
      ValidationErrors.AccountNumber = "AccountNumber is Required"
    }else if(AccountNumber.length > 18 || AccountNumber.length < 8){
      console.log("vad")
      ValidationErrors.AccountNumber = "AccountNumber invalid"
    }
    if(!AccountIFSC_code.trim()){
      ValidationErrors.AccountIFSC_code = "AccountIFSC_code is Required"
    }
    setErrors(ValidationErrors)
    if(Object.keys(ValidationErrors).length === 0){
    axios.patch(`${URL}/prowork/bankdetails`, {AccountHolderName, BankName, AccountNumber,  AccountIFSC_code, SignUpUserID:SignUpUserID.SignUpUserID})
    .then(function (response){
      setBankDataEdited(false)
      setTimeout(() => { toast.success("Information updated successfully") }, 700);
    })
  }
  }
  if(!BankDataEdited){
  axios.get(`${URL}/prowork/bankdetails/${SignUpUserID.SignUpUserID}`)
  .then(function (response){
    setBankDataUpdatedFirstTime('isBankDataCreated',response.data[0].isBankDataCreated ,{maxAge: 3600*24*21});
    setAccountHolderName(response.data[0].AccountHolderName)
    setBankName(response.data[0].BankName)
    setAccountNumber(response.data[0].AccountNumber)
    setAccountIFSC_code(response.data[0]. AccountIFSC_code)
  })
  }
 
  

  return (
    <div id="Profile">
      <Helmet><title>Worker Profile</title></Helmet>
      <div className="profile-content worker-content">
        <div className="walletwthdrawDiv"></div>
      
        <h1 className='profile-mainTitle'>Worker Profile</h1>

        <form className='profile-form'>
          <div className="personalInfo">
            <h1 className='profile-h1'>Bank Account Details</h1>

            <div className='profile-lainput'>
              <label className='profile-label' htmlFor="">Account Holder Name</label> 
              {BankDataUpdatedFirstTime.isBankDataCreated?(<div>{BankDataEdited?(<div><input value={AccountHolderName} className='profile-input' onChange={(e) =>setAccountHolderName(e.target.value)} type="text" />{error.AccountHolderName && <span className='errormassDiv'>{error.AccountHolderName}</span>}</div>):(<p className="profile-input">{AccountHolderName}</p>)}</div>):(<div><input placeholder='Enter account holder name' className='profile-input' onChange={(e) =>setAccountHolderName(e.target.value)} type="text" />{error.AccountHolderName && <span className='errormassDiv'>{error.AccountHolderName}</span>}</div>)}                 
            </div>

            <div className='profile-lainput'>
              <label className='profile-label' htmlFor="">BankName</label> 
              {BankDataUpdatedFirstTime.isBankDataCreated?(<div>{BankDataEdited?(<div><input value={BankName} className='profile-input' onChange={(e) =>setBankName(e.target.value)} type="text" />{error.BankName && <span className='errormassDiv'>{error.BankName}</span>}</div>):(<p className="profile-input">{BankName}</p>)}</div>):(<div><input placeholder='Enter your Bank' className='profile-input' onChange={(e) =>setBankName(e.target.value)} type="text" />{error.BankName && <span className='errormassDiv'>{error.BankName}</span>}</div>)}                 
            </div>

            


            <div className='profile-lainput'>
              <label className='profile-label' htmlFor="">Account Number</label> 
              {BankDataUpdatedFirstTime.isBankDataCreated?(<div>{BankDataEdited?(<div><input value={AccountNumber} className='profile-input' onChange={(e) =>setAccountNumber(e.target.value)} type="text" />{error.AccountNumber && <span className='errormassDiv'>{error.AccountNumber}</span>}</div>):(<p className="profile-input">{AccountNumber}</p>)}</div>):(<div><input placeholder='Enter your Account Number' className='profile-input' onChange={(e) =>setAccountNumber(e.target.value)} type="text" />{error.AccountNumber && <span className='errormassDiv'>{error.AccountNumber}</span>}</div>)}                 
            </div>

            <div className='profile-lainput'>
              <label className='profile-label' htmlFor="">IFSC Code</label> 
              {BankDataUpdatedFirstTime.isBankDataCreated?(<div>{BankDataEdited?(<div><input value={ AccountIFSC_code} className='profile-input' onChange={(e) =>setAccountIFSC_code(e.target.value)} type="text" />{error.AccountIFSC_code && <span className='errormassDiv'>{error.AccountIFSC_code}</span>}</div>):(<p className="profile-input">{AccountIFSC_code}</p>)}</div>):(<div><input placeholder='Enter IFSC Code' className='profile-input' onChange={(e) =>setAccountIFSC_code(e.target.value)} type="text" />{error.AccountIFSC_code && <span className='errormassDiv'>{error.AccountIFSC_code}</span>}</div>)}                 
            </div>

            
          </div>

          {BankDataUpdatedFirstTime.isBankDataCreated?(<div>{BankDataEdited?(<button onClick={(e) => HandleBankEdit(e)} className='saveDetails'>Update</button>):(<label onClick={bankEdit} className="userAccountEdit">Edit Details</label>)}</div>):(<button onClick={(e) => HandleBankSave(e)} className='saveDetails'>Save</button>)}
        </form>
      </div>

      <img className='profile-greenwave' src={greenwave} alt="" />
    </div>
  )
}

export default Profile