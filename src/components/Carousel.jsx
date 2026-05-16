import { ChevronLeft, ChevronRight } from "lucide-react";

export function Carousel() {
    {/*okların onclicklerine yeni foğrafa geçiş ekle*/}
  return (
    <div className="flex flex-col sm:flex-row relative bg-secondary-1 pt-28 gap-8 ">
      <div className="flex flex-col relative justify-center mx-8 items-center text-center text-light-text gap-9">
        <h4>WINTER 2027</h4>
        <h2>
          Vita Classic
          <br className="md:hidden" /> Product
        </h2>
        <h4 className="mx-14">
          We know how large objects will act, but things on a small scale.
        </h4>
        <h3>$16.48</h3>
        <button className="w-46 h-13 bg-success rounded-lg ">ADD TO CART</button>
       
      </div>
      <div>
         <div className="absolute inset-0 flex justify-between items-center px-4 sm:px-8 z-10 pointer-events-none">
          <button className="pointer-events-auto p-2 hover:scale-125 transition-transform">
            <ChevronLeft className="w-10 h-10 text-white" />
          </button>

          <button className="pointer-events-auto p-2 hover:scale-125 transition-transform">
            <ChevronRight className="w-10 h-10 text-white" />
          </button>
        </div>
      </div>
      <div>
        <img src="/col-md-6.png"></img>
      </div>
    </div>
  );
}
