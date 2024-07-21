import React from 'react'
import './Service.css'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { heroScrollx } from '../../func'
import { service_List } from '../../assets/serviceList'

function Service() {

  return (
    <div id='Service'>
      <Helmet><title>Pro Work - Services</title></Helmet>
     <div className="service-text" >
      <h1 className='service-title'>Services</h1>
      <p className='service-p'>All the workers here are skilled and they have years of experinces in there own field, so you can trust them for your work.</p>
     </div>

      <div className="service-content">
        {service_List.map((item, index) =>{
          return(
            <div key={index} className="card">
              <img src={item.image} className="card-img-top" />
              <div className="card-body">
                <p className="card-text"><b className="name"></b><br/></p>
                <Link onClick={heroScrollx} to={item.URL}>Open</Link>
              </div>
            </div>
          )
        })}
        

      </div>

    </div>
  )
}

export default Service