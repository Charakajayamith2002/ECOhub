import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  return (
    <div>
      <div className='bg-black' >
      <div className='flex flex-wrap justify-evenly'>
        <div className=' w-80 h-80 mt-5 text-white'>
          <h1 className='text-3xl font-medium text-green-400'>EcoPro</h1>
          <div className='h-1 w-36 bg-green-10 rounded-full mt-2'></div>
          <ul className='mt-5 text-lg'>
            <li className='mt-3'>Home</li>
            <li className='mt-3'>Browse</li>
            <li className='mt-3'>Sign In</li>
            <li className='mt-3'>Sign up</li>
          </ul>
        </div>

        <div className='text-white w-80 h-80 mt-5'>
          <h1 className='text-3xl font-medium text-green-400'>Get help</h1>
          <div className='h-1 w-20 bg-green-10 rounded-full mt-2'></div>
          <ul className='mt-5 text-lg'>
            <li className='mt-3'>FAQ</li>
            <li className='mt-3'>Pest & Diseases</li>
            <li className='mt-3'>Fertilizers</li>
            <li className='mt-3'>Community</li>
          </ul>
        </div>

        <div className='text-white w-80 h-80 mt-5'>
          <h1 className='text-3xl font-medium text-green-400'>Visit Us</h1>
          <div className='h-1 w-20 bg-green-10 rounded-full mt-2'></div>
          <ul className='mt-5 text-lg'>
            <li className='mt-3'>236/12</li>
            <li className='mt-3'>Pitipana North</li>
            <li className='mt-3'>Homagama</li>
          </ul>
        </div>
        <div className='text-white w-80 h-80 mt-5'>
        <h1 className='text-3xl font-medium text-green-400'>Follow us</h1>
        <div className='h-1 w-20 bg-green-10 rounded-full mt-2'></div>
        <div className='flex flex-wrap'>
          <FaFacebook className='text-4xl mt-5 mx-2 ' />
          <FaInstagram className='text-4xl mt-5 mx-2' />
          <FaTwitter className='text-4xl mt-5 mx-2' />
          <FaLinkedin className='text-4xl mt-5 mx-2' />
        </div>
        </div>
      </div>
    </div>

    </div>
  )
}

export default Footer
