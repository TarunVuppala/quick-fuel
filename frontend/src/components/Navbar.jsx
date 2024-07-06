import React from 'react'

const Navbar = () => {
  return (
    <div className='flex flex-row justify-between items-center px-[3rem] py-[2rem] fixed w-full'>
      <h1 className=' font-black text-3xl'>
        <span className='outline-[#FF0000] fill-[#fff]'>Quick</span>
        <span className='text-[#FF0000]'>Fuel</span>
        </h1>
      <div className='uppercase font-black lg:flex gap-5 hidden'>
        <div>Home</div>
        <div>Order</div>
        <div>About</div>
        <div>Contact</div>
      </div>
    </div>
  )
}

export default Navbar