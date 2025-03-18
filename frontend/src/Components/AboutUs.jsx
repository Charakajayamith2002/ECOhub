import React from 'react'

const AboutUs = () => {
  return (
    <>
    <div className="container bg-black max-w-1/2 h-[700px] mx-auto my-10 relative rounded-lg">
      <img
        src="https://images.pexels.com/photos/127420/pexels-photo-127420.jpeg"
        alt="About Us"
        className="object-cover  w-full h-full filter brightness-[0.45] grayscale rounded-lg"
      />

      <div className="absolute z-10 top-0 h-full w-full flex flex-col items-center justify-center text-center px-6">
        <h1 className="sm:text-[60px] text-green-400 font-sans font-bold">
          About Our Marketplace
        </h1>
        <p className="text-green-100 mt-4 text-lg sm:text-xl">
          We are passionate about sustainable agriculture and connecting
          farmers and buyers with high-quality organic fertilizers.
        </p>
      </div>
    </div>

    <section className="container mt-[200px] mx-auto my-12 px-6 py-12 bg-white rounded-lg  text-center text-black">
      <h2 className="text-[60px] font-bold mb-6">Our <span className='text-green-600'>Mission</span></h2>
      <p className="text-xl leading-relaxed">
        Our mission is to empower communities with environmentally-friendly
        fertilizer solutions that promote sustainable farming. We strive to
        bridge the gap between sellers and buyers by providing a transparent
        and reliable marketplace for organic fertilizers.
      </p>
    </section>

    <section className="container mt-[200px] mx-auto my-12 px-6 py-12 bg-white rounded-lg  text-center text-black">
      <h2 className="text-[60px] font-bold mb-6">Our <span className='text-green-600'>Vision</span></h2>
      <p className="text-lg leading-relaxed">
        Our vision is a world where sustainable agriculture practices are the
        norm, and every farmer has access to the tools they need for success,
        from fertilizers to knowledge-sharing.
      </p>
    </section>

    <section className="container mt-[200px] mx-auto my-12 px-6 py-12 flex flex-col md:flex-row items-center justify-around bg-white rounded-lg text-center">
      <div className="md:w-1/2 mb-10 md:mb-0">
        <img
          src="https://images.pexels.com/photos/175389/pexels-photo-175389.jpeg"
          alt="Team"
          className="rounded-lg object-cover h-80 w-full"
        />
      </div>
      <div className="md:w-1/2 text-black px-6 ml-6">
        <h2 className="text-3xl font-bold mb-6 text-start">Meet Our Team</h2>
        <p className="text-lg leading-relaxed text-start">
          Our dedicated team of agricultural enthusiasts is here to ensure
          that you get the best products and services. We are passionate about
          making a positive impact on the farming community through innovation
          and collaboration.
        </p>
      </div>
    </section>
  </>
  )
}

export default AboutUs
