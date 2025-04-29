// import React from 'react'
import { Heart, Sprout, Users, Globe, Award } from "lucide-react";


const AboutUs = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img
          src="https://images.pexels.com/photos/20280071/pexels-photo-20280071/free-photo-of-rosliny-w-szklarni.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Green fields and farms"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        
        <div className="relative z-20 container mx-auto h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
          About Green Farming Hub <span className="text-nature-300"></span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10">
          Green Farming Hub is transforming agriculture through technology. Our platform combines knowledge sharing, AI-driven disease detection, and crop management tools to help farmers improve yield, sustainability, and farming practices for a greener future.


          </p>
          
          <button className="bg-nature-500 hover:bg-nature-600 text-white rounded-full px-8 py-3 text-lg transition-all duration-300 hover:shadow-lg flex items-center gap-2">
            Learn More <Sprout size={18} />
          </button>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto py-20 px-4">
        <div className="max-w-6xl mx-auto bg-green rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 md:p-12 bg-nature-50/50">
              <div className="h-full flex flex-col justify-center">
                <div className="bg-green-100 inline-flex items-center justify-center w-16 h-16 rounded-full bg-nature-100 mb-6">
                  <Sprout size={32} className="text-nature-600 text-green-500" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Our <span className="text-nature-600 text-green-500">Mission</span>
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                At Green Farming Hub, our mission is to provide farmers with access to cutting-edge knowledge, tools, and technology. Through AI-powered disease detection, crop management, and knowledge sharing, we aim to enhance agricultural productivity, improve sustainability, and support the global farming community in overcoming the challenges of modern agriculture.
                </p>
              </div>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-px bg-gray-100">
              <div className="bg-white p-8 flex flex-col items-center text-center">
                <Heart className="text-green-500 mb-4 h-10 w-10" />
                <h3 className="font-bold text-xl mb-2">Sustainable</h3>
                <p className="text-gray-600">Promoting eco-friendly farming practices</p>
              </div>
              <div className="bg-white p-8 flex flex-col items-center text-center">
                <Award className="text-green-500 mb-4 h-10 w-10" />
                <h3 className="font-bold text-xl mb-2">Quality</h3>
                <p className="text-gray-600">Ensuring highest quality products</p>
              </div>
              <div className="bg-white p-8 flex flex-col items-center text-center">
                <Users className="text-green-500 mb-4 h-10 w-10" />
                <h3 className="font-bold text-xl mb-2">Community</h3>
                <p className="text-gray-600">Building valuable connections</p>
              </div>
              <div className="bg-white p-8 flex flex-col items-center text-center">
                <Globe className="text-green-500 mb-4 h-10 w-10" />
                <h3 className="font-bold text-xl mb-2">Global</h3>
                <p className="text-gray-600">Connecting farmers worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="container mx-auto py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2">
                <img 
                  src="https://images.pexels.com/photos/347926/pexels-photo-347926.jpeg"
                  alt="Vision" 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Our <span className="text-nature-600 text-green-500">Vision</span>
                </h2>
                <div className="w-20 h-1 bg-nature-500 rounded-full mb-8"></div>
                <p className="text-gray-700 text-lg leading-relaxed mb-8">
                To become the leading agro-tech platform, empowering farmers worldwide with innovative technology, sustainable practices, and AI-driven solutions, fostering a future of healthier crops, stronger communities, and a more sustainable agricultural ecosystem.
                </p>
                <div>
                <button className="border-2 border-green-500 text-green-500 border-nature-500 text-nature-600 hover:bg-nature-50 rounded-lg px-6 py-3">
                Join Our Movement
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Meet Our <span className="text-nature-600 text-green-500 ">Team</span>
            </h2>
            <div className="w-24 h-1 bg-nature-500 rounded-full mx-auto"></div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute inset-0 border-4 border-nature-200 rounded-xl translate-x-4 translate-y-4 -z-10"></div>
                <img
                  src="https://images.pexels.com/photos/175389/pexels-photo-175389.jpeg"
                  alt="Our Team"
                  className="w-full h-auto rounded-xl shadow-lg object-cover max-h-[500px]"
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <p className="text-lg leading-relaxed text-gray-700 mb-8">
                Our dedicated team of agricultural enthusiasts is here to ensure
                that you get the best products and services. We are passionate about
                making a positive impact on the farming community through innovation
                and collaboration.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-white border border-gray-100 shadow-sm">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-nature-100 flex items-center justify-center">
                    <Users className=" text-green-500 w-6 h-6 text-nature-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Agricultural Experts</h3>
                    <p className="text-gray-600 text-sm">Specialists with years of field experience</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-white border border-gray-100 shadow-sm">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-nature-100 flex items-center justify-center">
                    <Sprout className="text-green-500 w-6 h-6 text-nature-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Sustainability Champions</h3>
                    <p className="text-gray-600 text-sm">Dedicated to earth-friendly solutions</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-white border border-gray-100 shadow-sm">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-nature-100 flex items-center justify-center">
                    <Heart className="text-green-500 w-6 h-6 text-nature-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Community Builders</h3>
                    <p className="text-gray-600 text-sm">Creating valuable connections</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-white border border-gray-100 shadow-sm">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-nature-100 flex items-center justify-center">
                    <Award className="text-green-500 w-6 h-6 text-nature-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Quality Assurance</h3>
                    <p className="text-gray-600 text-sm">Maintaining highest standards</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-nature-600 py-16 my-20 bg-green-500 ">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">500+</h3>
              <p className="text-nature-100 font-bold text-white">Farmers Connected</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">20+</h3>
              <p className="text-nature-100 font-bold text-white">Countries Reached</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">95%</h3>
              <p className="text-nature-100 font-bold text-white">Customer Satisfaction</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">100%</h3>
              <p className="text-nature-100 font-bold text-white">Organic Products</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto p-12 rounded-2xl shadow-sm border bg-green-50 border-gray-100">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our <span className="text-nature-500">Community</span></h2>
          <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
            Be part of our growing network of sustainable farmers and suppliers. Together, we can create a greener, more sustainable future for agriculture.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-green-500 text-white font-bold border-2 border-nature-500 text-nature-600 hover:bg-nature-50 rounded-lg px-6 py-3">
          Register Today
            </button>
            <button className="border-2 border-green-500 text-green-500 border-nature-500 text-nature-600 hover:bg-nature-50 rounded-lg px-6 py-3">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;