import React from 'react'
import './Failed.css'
import toast from 'react-hot-toast'
function Failed() {
setTimeout(() => {
  toast.error("Your Payment was not successful")
}, 500);
  return (
    <div id="Failed">
        
      <h1 className='failedh1'>Payment Failed</h1>
      {/* <h3 className='successh3'><span className='payID'>Payment ID:</span> {query && query.get("payment_id")}</h3> */}
      {/* <button className='home404 suc404'><a href='/'>Home</a></button> */}
    </div>
    
  )
}

export default Failed