import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

function Hero() {
  const imgUrl = [
    "/shop-hero-1-product-slide-1.jpg",
    "/shop-hero-1-product-slide-2.jpg",
  ];
  const [nextHeroBg, setNextHeroBg] = useState(imgUrl[0]);

  const handleBannerChange = () => {
    nextHeroBg === imgUrl[0]
      ? setNextHeroBg(imgUrl[1])
      : setNextHeroBg(imgUrl[0]);
  };
  return (
    <div
      style={{ backgroundImage: `url(${nextHeroBg})` }}
      className=" w-full 
      aspect-4/5        
      sm:aspect-video      /* Tablet ve üstünde 16:9 yatay */
      lg:h-[80vh]          /* Çok geniş ekranlarda ekranın %80'i kadar boy */ 
      bg-cover 
      bg-center 
      bg-no-repeat
      flex flex-col justify-center items-center 
      transition-all duration-500
     "
    >
      <span className="text-white">Winter 2027</span>
      <h3 className="text-white text-center mt-6">
        NEW
        <br className="lg:hidden" /> COLLECTION
      </h3>
      <div className="flex justify-between w-full px-4 sm:px-6 lg:px-10">
        <button onClick={() => handleBannerChange()} className="hover:scale-110 transition-transform">
          <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        </button>
        <button onClick={() => handleBannerChange()} className="hover:scale-110 transition-transform">
          <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        </button>
      </div>

      <div className="w-11/12 sm:w-2/3 text-white text-center text-sm sm:text-base">
        We know how large objects will act, but things on a small scale
      </div>
      <button className="bg-success w-40 h-8 text-white mt-6">SHOP NOW</button>
    </div>
  );
}

export default Hero;
