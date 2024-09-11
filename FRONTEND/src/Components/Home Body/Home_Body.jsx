import React from 'react'
import { Link } from 'react-router-dom'
import './Home_Body.css'
import Category_Labourer from '../../assets/Category_Labourer.jpg'
import Category_Priest from '../../assets/Category_Priest.jpg'
import Category_Mechanic from '../../assets/Category_Mechanic.jpg'
import Category_Tutor from '../../assets/Category_Tutor.jpg'
import blob from '../../assets/blob.svg'
import greenwave from '../../assets/green wave.jpg'
import plus from '../../assets/plus.png'
import minus from '../../assets/minus.png'
import heroLower_Electrician from '../../assets/heroLower_Electrician.jpg'
import heroLower_Cook from '../../assets/heroLower_Cook.jpg'
import heroLower_Priest from '../../assets/heroLower_Priest.jpg'
import heroLower_Talior from '../../assets/heroLower_Talior.jpg'
import heroLower_Contractor from '../../assets/heroLower_Contractor.jpg'

import {homeBodyAnimation, heroScrollx} from '../../func'

function Home_Body() {

  
  function Plus1(){    
    const plus1 = document.querySelector('.plus1')
    const faqAns1 = document.querySelector('.faqAns1')
    const minus1 = document.querySelector('.minus1')
    faqAns1.classList.add('faqmove')
    minus1.classList.add('display')
    plus1.classList.add('displayN')
    Minus2(),Minus3(),Minus4(),Minus5()
  }
  function Plus2(){    
    const plus2 = document.querySelector('.plus2')
    const faqAns2 = document.querySelector('.faqAns2')
    const minus2 = document.querySelector('.minus2')
    faqAns2.classList.add('faqmove')
    minus2.classList.add('display')
    plus2.classList.add('displayN')
    Minus1(),Minus3(),Minus4(),Minus5()
  }
  function Plus3(){    
    const plus3 = document.querySelector('.plus3')
    const faqAns3 = document.querySelector('.faqAns3')
    const minus3 = document.querySelector('.minus3')
    faqAns3.classList.add('faqmove')
    minus3.classList.add('display')
    plus3.classList.add('displayN')
    Minus1(),Minus2(),Minus4(),Minus5()
  }
  function Plus4(){    
    const plus4 = document.querySelector('.plus4')
    const faqAns4 = document.querySelector('.faqAns4')
    const minus4 = document.querySelector('.minus4')
    faqAns4.classList.add('faqmove')
    minus4.classList.add('display')
    plus4.classList.add('displayN')
    Minus1(),Minus2(),Minus3(),Minus5()
  }
  function Plus5(){    
    const plus5 = document.querySelector('.plus5')
    const faqAns5 = document.querySelector('.faqAns5')
    const minus5 = document.querySelector('.minus5')
    faqAns5.classList.add('faqmove')
    minus5.classList.add('display')
    plus5.classList.add('displayN')
    Minus1(),Minus2(),Minus3(),Minus4()
  }
  function Minus1(){
    const plus1 = document.querySelector('.plus1')
    const faqAns1 = document.querySelector('.faqAns1')
    const minus1 = document.querySelector('.minus1')
    faqAns1.classList.remove('faqmove')
    minus1.classList.remove('display')
    plus1.classList.remove('displayN')
  }
  function Minus2(){
    const plus2 = document.querySelector('.plus2')
    const faqAns2 = document.querySelector('.faqAns2')
    const minus2 = document.querySelector('.minus2')
    faqAns2.classList.remove('faqmove')
    minus2.classList.remove('display')
    plus2.classList.remove('displayN')
  }
  function Minus3(){
    const plus3 = document.querySelector('.plus3')
    const faqAns3 = document.querySelector('.faqAns3')
    const minus3 = document.querySelector('.minus3')
    faqAns3.classList.remove('faqmove')
    minus3.classList.remove('display')
    plus3.classList.remove('displayN')
  }
  function Minus4(){
    const plus4 = document.querySelector('.plus4')
    const faqAns4 = document.querySelector('.faqAns4')
    const minus4 = document.querySelector('.minus4')
    faqAns4.classList.remove('faqmove')
    minus4.classList.remove('display')
    plus4.classList.remove('displayN')
  }
  function Minus5(){
    const plus5 = document.querySelector('.plus5')
    const faqAns5 = document.querySelector('.faqAns5')
    const minus5 = document.querySelector('.minus5')
    faqAns5.classList.remove('faqmove')
    minus5.classList.remove('display')
    plus5.classList.remove('displayN')
  }


  return (
    <div  className='Home_Body'>
      <div className="box1" >
        <div className="sub-box1" onLoad={homeBodyAnimation}>
          <div className="sub-box1-left" data-cursor="-lg" data-cursor-text="PRO WORK"></div>
          <div className="sub-box1-left-a"> <img className='Category_Labourer' src={Category_Labourer} alt="" /> </div >
          <div className="sub-box1-left-b"> <img className='Category_Tutor' src={Category_Tutor} alt="" /> </div>
          <div className="sub-box1-left-c"> <img className='Category_Mechanic' src={Category_Mechanic} alt="" /> </div>
          <div className="sub-box1-left-d"> <img className='Category_Priest' src={Category_Priest} alt="" /> </div>
        </div>

          
        <div className="sub-box1 sub-box12">
          <div className="sub-box1-right" data-cursor="-lg" data-cursor-text="PRO WORK"></div>
          <h1 data-cursor="-md -opaque" className="sub-box1-right-title"> Hey!,</h1>
          <h1 className='sub-box1-right-titlee vb'>I need a Priest</h1>
          <p className='sub-box1-right-p'>From Priest to labour, we have more than 8 varities of daily household services available at your door on just one click. Our workers have years of experienceed in their work and they ensure quality work at affordable price. To book a service </p>
          <Link onClick={heroScrollx} to='/services'><button data-cursor="-hidden" className='sub-box1-right-btn'>Click Here</button></Link>
          <img className='blob' src={blob} alt="" />
        </div>
      </div>


      <div className="workcatagory">
        <h1 className='WC_title'>Offered Services</h1>

        <div className="hero-lower" id="Hero-lower">
        <div className="hero-lower5">
            <a href="/services/electrician" className="box"><img src={heroLower_Electrician}/></a>
            <a href="/services/priest" className="box"><img src={heroLower_Priest}/></a>
            <a href="/services/cook" className="box"><img src={heroLower_Cook}/></a>
            <a href="/services/talior" className="box"><img src={heroLower_Talior}/></a>
            <a href="/services/contractor" className="box"><img src={heroLower_Contractor}/></a>
        </div>
        <div className="hero-lower5">
            <a href="/services/electrician" className="box"><img src={heroLower_Electrician}/></a>
            <a href="/services/priest" className="box"><img src={heroLower_Priest}/></a>
            <a href="/services/cook" className="box"><img src={heroLower_Cook}/></a>
            <a href="/services/talior" className="box"><img src={heroLower_Talior}/></a>
            <a href="/services/contractor" className="box"><img src={heroLower_Contractor}/></a>
        </div>
        <div className="hero-lower5">
            <a href="/services/electrician" className="box"><img src={heroLower_Electrician}/></a>
            <a href="/services/priest" className="box"><img src={heroLower_Priest}/></a>
            <a href="/services/cook" className="box"><img src={heroLower_Cook}/></a>
            <a href="/services/talior" className="box"><img src={heroLower_Talior}/></a>
            <a href="/services/contractor" className="box"><img src={heroLower_Contractor}/></a>
        </div>
    </div>

      
      </div>


      <div className="waveDiv">
        <div className="FAQ">
          <h1>FAQs</h1>
          <div className="faqDiv">
            <div className="faqQques faqQques1">What if I’m not satisfied with the services? <img onClick={Plus1} className='plus plus1' src={plus} alt="" /> <img onClick={Minus1} className='minus minus1' src={minus} alt="" /> </div>
            <div className="faqAns faqAns1">To provide you the desired quality of work, we have a ‘satisfactory replacement policy’ as part of our company. For that just reach out to our customer support and provide the vaild reason and we will help you in getting the new service man.</div>

            <div className="faqQques faqQques2">I have done the payment but the booking is not showing?<img onClick={Plus2} className='plus plus2' src={plus} alt="" /> <img onClick={Minus2} className='minus minus2' src={minus} alt="" />  </div>
            <div className="faqAns faqAns2">If your money is deducted then kindly wait for half hours, your booking will be updated soon. If the problem still continues please contact customer support. </div>

            <div className="faqQques faqQques3">What are the services we provide here? <img onClick={Plus3} className='plus plus3' src={plus} alt="" /> <img onClick={Minus3} className='minus minus3' src={minus} alt="" /> </div>
            <div className="faqAns faqAns3">On Pro Work, we offer 8 different kind of household services, which include housemaid, electrician, priest etc. All our service man are experienced and they ensure to provide the best quality work.</div>

            <div className="faqQques faqQques3">What are the timings to book the services? <img onClick={Plus4} className='plus plus4' src={plus} alt="" /> <img onClick={Minus4} className='minus minus4' src={minus} alt="" /> </div>
            <div className="faqAns faqAns4">Currently, we operate on a 12 hours routine, which means you can book any of the services available on our platform between 9:00 A.M. to 9:00 P.M.</div>

            <div className="faqQques faqQques3">Is it safe to hire a person from Pro Work?<img onClick={Plus5} className='plus plus5' src={plus} alt="" /> <img onClick={Minus5} className='minus minus5' src={minus} alt="" /></div>
            <div className="faqAns faqAns5">To ensure our customers safty, our all service man are aadhar verified.</div>
          </div>
        </div>
       <img className='greenwave' src={greenwave} alt="" />
      </div>
    </div>
  )
}

export default Home_Body