import React from 'react'
import { Link } from 'react-router-dom'

const Final = () => {
  return (
    <div className='h-fit flex flex-col lg:flex-row justify-center items-center gap-[5rem] px-[5rem] py-[5rem]'>
        {/* Image */}
        <img src="/images/Final.png" alt="Calendar" className='lg:w-[30%]' draggable={false}/>
        <div className='flex flex-col gap-[1rem] lg:max-w-[40%]'>
            <p className='font-semibold text-1xl'>Discover the ultimate in convenience and reliability with our top-tier fuel delivery and vehicle repair services. Our commitment to quality ensures your vehicle receives the best care, whether you need a quick refuel or expert maintenance.</p>
            <Link to='/order'>Book Now</Link>
        </div>
    </div>
  )
}

export default Final