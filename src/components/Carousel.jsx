import { ChevronLeft, ChevronRight } from "lucide-react";

export function Carousel() {
    {/*okların onclicklerine yeni foğrafa geçiş ekle*/}
  return (
    <div className="flex flex-col sm:flex-row relative bg-secondary-1 pt-16 sm:pt-28 gap-8 px-10 sm:px-6 lg:px-10 xl:px-20">
      <div className="flex flex-col relative justify-center items-center sm:items-start text-center sm:text-left text-light-text gap-4 sm:gap-9">
        <h4 className="text-sm sm:text-base">WINTER 2027</h4>
        <h2 className="text-2xl sm:text-4xl">
          Vita Classic
          <br className="hidden sm:block"/> Product
        </h2>
        <h4 className="text-sm sm:text-base">
          We know how large objects will act, but things on a small scale.
        </h4>
        <h3 className="text-xl sm:text-2xl">$16.48</h3>
        <button className="w-44 sm:w-46 h-12 sm:h-13 bg-success rounded-lg hover:bg-opacity-90 transition-all">ADD TO CART</button>
       
      </div>
      <div className="hidden sm:flex absolute inset-0 justify-between items-center px-4 sm:px-8 z-10 pointer-events-none">
        <button className="pointer-events-auto p-2 hover:scale-125 transition-transform">
          <ChevronLeft className="w-10 h-10 text-white" />
        </button>

        <button className="pointer-events-auto p-2 hover:scale-125 transition-transform">
          <ChevronRight className="w-10 h-10 text-white" />
        </button>
      </div>
      <div className="hidden sm:flex flex-1 justify-center items-center">
        <img src="/col-md-6.png" className="w-full h-auto object-contain"></img>
      </div>
    </div>
  );
}
