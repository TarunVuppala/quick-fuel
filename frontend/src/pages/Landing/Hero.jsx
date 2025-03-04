import React from 'react'
import CTA from '../../components/CTA'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='h-screen '>
        <div className='h-screen flex flex-col lg:flex-row justify-center items-center px-[1rem] lg:px-[20rem]'>
            {/* Text */}
            <div className='flex flex-col gap-[1rem] items-center lg:items-start'>
                <h1 className='font-black text-3xl lg:text-7xl'>Hassle-Free  Fuel Delivery Anytime, Anywhere!</h1>
                {/* <CTA text={"Book Now"} /> */}
                <Link to='/booking' className='bg-[#ff0000] text-black px-[1rem] py-[1rem] rounded-[0.5rem] font-black'>Book Now</Link>
            </div>
            {/* Image */}
            <img src='/images/Hero.png' className='lg:w-[60%]' draggable={false}></img>
        </div>
    </div>
  )
}

export default Hero