// import React from 'react'

const Details = () => {
  return (
    <div className='flex flex-col md:flex-row max-w-1/2 h-[600px] gap-x-5 gap-y-6 mx-auto mt-[124px] px-16 py-8 container'>
        <div className='relative w-full h-[400px] overflow-hidden'>
            <img src="https://images.pexels.com/photos/18900457/pexels-photo-18900457/free-photo-of-tractor-on-rural-field.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt=""
            className='object-cover w-full h-full rounded-[24px] md:h-[400px]'
            />
        </div>

        <div className='flex flex-col h-full w-full py-10 px-16'>
            <h1 className='font-bold text-5xl text-green-500'> <span className=' text-3xl font-bold text-black'>What is </span><br /> Green Farming Hub</h1>
            <p className='text-xl py-3'>Green Farming Hub is transforming agriculture through technology. Our platform combines knowledge sharing, AI-driven disease detection, and crop management tools to help farmers improve yield, sustainability, and farming practices for a greener future.</p>
        </div>
    </div>
  )
}

export default Details
