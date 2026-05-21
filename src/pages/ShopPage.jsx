import ProductCard from "../components/ProductCard";
import { BrandsFav } from "../components/ShopComponents/BrandsFav";
import { CategoryCard } from "../components/ShopComponents/CategoryCard";
import { ViewAndFilterButtons } from "../components/ShopComponents/ViewAndFilterButtons";
import { productsData } from "../data/products";

function ShopPage() {
  
  const category = [
    { id: 1, img: "/card-item-1.png", title: "CLOTHES", items: "5" },
    { id: 2, img: "/card-item-2.png", title: "CLOTHES", items: "5" },
    { id: 3, img: "/card-item-3.png", title: "CLOTHES", items: "5" },
    { id: 4, img: "/card-item-4.png", title: "CLOTHES", items: "5" },
    { id: 5, img: "/card-item-5.png", title: "CLOTHES", items: "5" },
  ];
 
  return (
    <div>
      {/* 
        Dış boşlukları (Margin) kademeli yaptık:
      */}
      <div className="px-10 sm:px-6 lg:px-10 xl:px-20 py-8 w-full">
       
        <div className="flex flex-col sm:flex-row sm:flex-wrap xl:flex-nowrap gap-4 sm:gap-2 lg:gap-1.5">
          {category.map((cat) => (
            <div key={cat.id} className="flex-1 min-w-0">
              <CategoryCard
                bgImgUrl={cat.img}
                title={cat.title}
                items={cat.items}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="px-10 sm:px-6 lg:px-10 xl:px-20">
        <ViewAndFilterButtons />
      </div>

      {/* ÜRÜNLER ALANI */}
      <div className="my-15 px-10 sm:px-6 lg:px-10 xl:px-20 max-w-7xl xl:mx-auto">
        <div className="flex flex-wrap gap-6">
          {productsData.map((product) => (
            <div
              key={product.id}
              className="w-full 
                         sm:w-[calc(50%-12px)]
                         md:w-[calc(33.33%-16px)] 
                         lg:w-[calc(25%-18px)]"
            >
              <ProductCard
              id={product.id}
                bgImgUrl={product.img}
                title={product.title}
                actualPrice={product.actualPrice}
                salePrice={product.salePrice}
                colors = {product.colors}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Sayfalama */}
      <div className="flex justify-center items-center my-10 gap-1">
        <button className="px-4 py-3 sm:px-6.25 sm:py-6.25 bg-[#F3F3F3]  hover:bg-[#DDDDDD] border border-neutral-200/80 text-neutral-600 rounded-l-sm cursor-pointer text-sm sm:text-base">
          First
        </button>
        <button className="px-3 py-3 sm:py-6.25 sm:px-5 text-primary-text hover:scale-120 bg-white border border-neutral-200/80 cursor-pointer text-sm sm:text-base">
          1
        </button>
        <button className="px-3 py-3 sm:py-6.25 sm:px-5 text-primary-text hover:scale-120 bg-white border border-neutral-200/80 cursor-pointer text-sm sm:text-base">
          2
        </button>
        <button className="px-3 py-3 sm:py-6.25 sm:px-5 text-primary-text hover:scale-120 bg-white border border-neutral-200/80 cursor-pointer text-sm sm:text-base">
          3
        </button>
        <button className="px-4 py-3 sm:px-6.25 sm:py-6.25 bg-primary  hover:bg-hover text-white border border-neutral-200/80 rounded-r-sm cursor-pointer text-sm sm:text-base">
          Next
        </button>
      </div>
      <div>
        <BrandsFav/>
      </div>
    </div>
  );
}

export default ShopPage;
