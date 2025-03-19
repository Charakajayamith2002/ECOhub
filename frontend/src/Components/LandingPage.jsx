import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const LandingPage = () => {
  const images = [
    "https://images.pexels.com/photos/1243015/pexels-photo-1243015.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1",
    "https://cdn.pixabay.com/photo/2015/07/24/17/44/field-858653_1280.jpg",
    "https://cdn.pixabay.com/photo/2014/07/06/17/20/tractor-385681_1280.jpg",
  ];

  return (
    <div className="w-full h-screen">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={5000} // Slower transitions for better readability
        className="h-full"
      >
        {images.map((image, index) => (
          <div key={index} className="relative w-full h-screen">
            <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>

            {/* Overlay Content with Animation */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="text-4xl md:text-6xl font-extrabold text-green-400 drop-shadow-xl"
              >
                Welcome to the Fertilizer Marketplace
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, ease: "easeOut", delay: 0.5 }}
                className="text-lg md:text-2xl text-green-100 mt-4 max-w-3xl drop-shadow-lg"
              >
                Buy and sell high-quality fertilizers to boost your farming productivity.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 1 }}
                className="mt-6 px-8 py-4 text-lg font-semibold bg-green-500 text-white rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 hover:scale-110"
              >
                Explore Now
              </motion.button>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default LandingPage;
