import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  ShoppingCart,
} from "lucide-react";
import { useParams } from "react-router-dom";

export function ProductDetailsCard() {
  const { id } = useParams();

  const productDetailsList = [
    {
      id: 1,
      mainImgUrl: "/carouselMain.png",
      detailImg1: "/carouselCaption-1.jpg",
      detailImg2: "/carouselCaption-2.png",
      title: "Floating Phone",
      review: 10,
      availability: true,
      description:
        "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.",
      price: "1,139.33",
      colors: ["primary", "success", "alert", "dark-bg"],
    },
  ];
  const product = productDetailsList.find((item) => item.id === Number(id));
  return (
    <div className="mx-8 sm:mx-12 md:mx-45 flex flex-col md:flex-row">
      <div className="flex flex-col gap-5 flex-1">
        {/* Okların resmin dışına taşmasını engelleyen sarmalayıcı (w-fit mx-auto) */}
        <div className="relative w-full h-fit  overflow-hidden ">
          <img
            src={product.mainImgUrl}
            alt={product.title}
            className="w-full object-contain block"
          />

          <button className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full  hover:bg-black/20 text-white transition-all cursor-pointer group">
            <ChevronLeft className="w-12 h-12 md:w-14 md:h-14 group-hover:scale-120 transition-transform" />
          </button>

          <button className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full  hover:bg-black/20 text-white transition-all cursor-pointer group">
            <ChevronRight className="w-12 h-12 md:w-14 md:h-14 group-hover:scale-120 transition-transform" />
          </button>
        </div>

        {/* Küçük Detay Resimleri */}
        <div className="flex gap-5 ">
          <img
            src={product.detailImg1}
            className="w-25 h-18.75 object-cover  cursor-pointer hover:scale-120"
            alt="detail 1"
          />
          <img
            src={product.detailImg2}
            className="w-25 h-18.75 object-cover  cursor-pointer hover:scale-120"
            alt="detail 2"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 my-2 p-6 flex-1">
        <h4>{product.title}</h4>
        <div className="flex gap-3">
          {/*yıldızları değişken yap lucidden bir tane al her zaman 5 tane olsun yorum puanına gçre içi dolsun*/}
          <img src="/stars.svg" />
          <h6 className="text-second-text">{product.review} Reviews</h6>
        </div>
        <div className="flex flex-col gap-2 mt-3">
          <h3>{product.price}</h3>
          <div className="flex gap-2">
            <h6 className="text-second-text">Availability :</h6>
            <h6
              className={`${product.availability === true ? "text-primary" : "text-danger-text"}`}
            >
              {product.availability ? "In Stock" : "Out Of Stock"}
            </h6>
          </div>
        </div>
        <p className="text-[#858585] border-b  py-4 ">{product.description}</p>
        <div className="flex flex-col gap-12">
          <div className="flex gap-2.5">
            {/*renkler*/}
            {product.colors.map((color, index) => (
              <div
                key={index}
                className={`w-7.5 h-7.5 bg-${color} rounded-full hover:scale-120`}
              />
            ))}
          </div>
          <div className="flex gap-2.5">
            {/*buttonlar*/}
            <button className="px-5 py-2.5 bg-primary hover:bg-hover text-light-text rounded-sm">
              <h6>Select Options</h6>
            </button>
            <button className="w-10 h-10 bg-light-bg rounded-full flex items-center justify-center hover:scale-120  hover:bg-gray-200">
              <Heart strokeWidth={1.5} className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 bg-light-bg rounded-full flex items-center justify-center hover:scale-120 hover:bg-gray-200">
              <ShoppingCart strokeWidth={1.5} className="w-5 h-5 " />
            </button>
            <button className="w-10 h-10 bg-light-bg rounded-full flex items-center justify-center hover:scale-120  hover:bg-gray-200">
              <Eye strokeWidth={1.5} className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
