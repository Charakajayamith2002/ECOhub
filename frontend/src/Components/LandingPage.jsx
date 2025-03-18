import React from 'react';
//https://images.pexels.com/photos/127420/pexels-photo-127420.jpeg


const LandingPage = () => {
  return (
    <>
    <div className=' container bg-black max-w-1/2 h-[600px] mx-auto my-10 relative rounded-lg'>
        
      <img src="https://images.pexels.com/photos/1243015/pexels-photo-1243015.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
      alt=""
      className='object-cover w-full h-full filter brightness-[0.45] rounded-lg'
      />

      <div className='absolute flex flex-col z-10 top-0 h-full w-full items-center justify-center'>
          <div className=''>
              <h1 className='sm:text-[60px]  text-green-400 font-sans font-bold text-center '>Welcome to the Fertilizer <br /> Marketplace</h1>
              <p className='text-green-100 my-5 text-center'>Buy and Sell Fertilizers</p>
              
          </div>
          <div>
          <button className='bg-green-400 text-black my-5 py-2 px-4 rounded-md hover:bg-green-600'>View More </button>
          </div>
      </div>

    </div>
    </>
  );
};

export default LandingPage;
