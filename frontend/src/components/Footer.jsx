import React from 'react'

const Footer = () => {
  return (
    <div className='flex flex-col w-full justify-center items-center py-[1rem]'>
        <h1 className=' font-black text-3xl'>
            <span className='outline-[#FF0000] fill-[#fff]'>Quick</span>
            <span className='text-[#FF0000]'>Fuel</span>
        </h1>
        <div>
        © All rights reserved.
        </div>
    </div>
  )
}

export default Footer