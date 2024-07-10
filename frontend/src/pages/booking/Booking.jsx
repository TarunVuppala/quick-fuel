import React from 'react'

const Booking = () => {
  return (
    <div className='h-screen flex flex-col lg:flex-row justify-center items-center p-[1rem]'>
        <img src="/images/booking.png" alt="tanker" />
        <div className='flex flex-col justify-center items-center gap-[1rem]'>
          <h1 className='font-black text-3xl uppercase'>Booking Details</h1>
          <div className='flex flex-row gap-[1rem]'>
            <input type="text" placeholder='Fuel Type' className='border p-[1rem] rounded-[1rem] w-full'/>
            <input type="date" placeholder='Deliver By' className='border p-[1rem] rounded-[1rem] w-full'/>
          </div>
          <input type="number" placeholder='Quantity' className='border p-[1rem] rounded-[1rem] w-full'/>
          <input type="text" placeholder='Address' className='border p-[1rem] rounded-[1rem] w-full'/>
          <button className='border p-[1rem] rounded-[1rem] w-fit font-black uppercase border-[#ff0000] text-[#ff0000]'>Place Order</button>
        </div>
    </div>
  )
}

export default Booking