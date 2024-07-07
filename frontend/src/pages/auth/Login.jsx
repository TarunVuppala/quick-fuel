import React from 'react'
import CTA from "../../components/CTA"

const Login = () => {
  return (
    <div className='h-screen w-full flex flex-col justify-center items-center'>
        <form className='flex flex-col w-fit p-[5rem] rounded-[0.5rem] gap-[1rem] justify-center items-center' onSubmit={""}>
            <h1 className='font-black text-2xl'>LOGIN</h1>
            <input type="number" placeholder='phone number' className='border bg-transparent px-[1rem] py-[1rem] rounded-[0.5rem] font-black' />
            <input type="password" placeholder='password' className='border bg-transparent px-[1rem] py-[1rem] rounded-[0.5rem] font-black' />
            <CTA text={"Login"} action={""}/>
        </form>
    </div>
  )
}

export default Login