import React from 'react'

const About = () => {
  return (
    <div className='h-fit bg-[#D94044] text-white flex flex-col justify-center items-center py-[5rem]'>
        {/* Fuel Section */}
        <div className='flex flex-col lg:flex-row justify-center items-center px-[1rem] lg:max-w-[70%]'>
            {/* Left Section */}
            <img src='/images/About_1.png' draggable={false}/>
            {/* Right Section */}
            <div className='flex flex-col gap-[1rem]'>
                <h3 className='font-[500] text-1xl'>Experience the ultimate convenience with our hassle-free fuel delivery service. Whether youre at home, work, or on the go, our efficient delivery system ensures you never run out of fuel. Simply book your fuel online, and our team will deliver it to your desired location swiftly and safely.</h3>
                <h2 className='font-[700]'>Key Benefits</h2>
                <div className=''>
                    <h2 className='font-[600]'>Convenience</h2>
                    <p>Order fuel from anywhere, at any time, and have it delivered directly to you.</p>
                </div>
                <div className=''>
                    <h2 className='font-[600]'>Time-Saving</h2>
                    <p>No more trips to the gas station. Save time and focus on what matters.</p>
                </div>
                <div className=''>
                    <h2 className='font-[600]'>Reliability</h2>
                    <p>Count on us for timely and accurate fuel deliveries.</p>
                </div>
            </div>
        </div>



        {/* Service Section */}
        <div className='flex flex-col lg:flex-row justify-center items-center  max-w-[70%]'>
            
            {/* Left Section */}
            <div className='flex flex-col gap-[1rem]'>
                <h3 className='font-[500]'>Keep your vehicle running smoothly with our comprehensive repair services. From routine maintenance to complex repairs, our skilled technicians use the latest tools and quality parts to ensure your vehicle is in top condition.</h3>
                <h2 className='font-[700]'>Key Benefits</h2>
                <div className=''>
                    <h2 className='font-[600]'>Convenience</h2>
                    <p>Order fuel from anywhere, at any time, and have it delivered directly to you.</p>
                </div>
                <div className=''>
                    <h2 className='font-[600]'>Time-Saving</h2>
                    <p>No more trips to the gas station. Save time and focus on what matters.</p>
                </div>
                <div className=''>
                    <h2 className='font-[600]'>Reliability</h2>
                    <p>Count on us for timely and accurate fuel deliveries.</p>
                </div>
            </div>
            {/* Right Section */}
            <img src='/images/About_2.png' draggable={false}/>
        </div>
    </div>
  )
}

export default About