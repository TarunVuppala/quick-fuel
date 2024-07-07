import React from 'react'
import CTA from '../../components/CTA'

const Hero = () => {
  return (
    <div className='h-screen '>
        <div className='h-screen flex flex-col lg:flex-row justify-center items-center px-[1rem] lg:px-[20rem]'>
            {/* Text */}
            <div className='flex flex-col gap-[1rem] items-center lg:items-start'>
                <h1 className='font-black text-3xl lg:text-7xl'>Hassle-Free  Fuel Delivery Anytime, Anywhere!</h1>
                <CTA text={"Book Now"}/>
            </div>
            {/* Image */}
            <img src='/images/Hero.png' className='lg:w-[60%]' draggable={false}></img>
        </div>
    </div>
  )
}

export default Hero