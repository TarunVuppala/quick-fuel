import React from 'react'
import { Link } from 'react-router-dom'

const Order = () => {
  return (
    <div className='h-screen flex flex-col justify-center items-center gap-4 p-4'>
      <h1 className='font-black text-3xl mb-4'>Order Services</h1>
      <button className='bg-[#FFD700] text-black px-4 py-2 rounded font-black'>
        <Link to='/booking'>Fuel Booking</Link>
      </button>
      <button className='bg-[#FFD700] text-black px-4 py-2 rounded font-black'>
        <Link to='/mbooking'>Repair Booking</Link>
      </button>
    </div>
  )
}

export default Order