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
      <div className="mx-10 xl:mx-45 py-8">
       
        <div className="flex flex-col sm:flex-row sm:flex-wrap xl:flex-nowrap -mx-2 gap-y-4">
          {category.map((cat) => (
            <CategoryCard
              key={cat.id}
              bgImgUrl={cat.img}
              title={cat.title}
              items={cat.items}
            />
          ))}
        </div>
      </div>

      <div className="px-10">
        <ViewAndFilterButtons />
      </div>

      {/* ÜRÜNLER ALANI */}
      <div className="my-15 mx-10 xl:mx-45">
        <div className="flex flex-wrap -mx-3.75">
          {productsData.map((product) => (
            <div
              key={product.id}
              className="w-full px-3.75 mb-12 
                         sm:w-1/2 
                         md:w-1/3 
                         xl:w-1/4"
            >
              <ProductCard
              id={product.id}
                bgImgUrl={product.img}
                title={product.title}
                actualPrice={product.actualPrice}
                salePrice={product.salePrice}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Sayfalama */}
      <div className="flex justify-center items-center my-10">
        <button className="p-6.25 bg-[#F3F3F3]  hover:bg-[#DDDDDD] border border-neutral-200/80 text-neutral-600 rounded-l-sm cursor-pointer">
          First
        </button>
        <button className="py-6.25 px-5 text-primary-text hover:scale-120 bg-white border border-neutral-200/80 cursor-pointer">
          1
        </button>
        <button className="py-6.25 px-5 text-primary-text hover:scale-120 bg-white border border-neutral-200/80 cursor-pointer">
          2
        </button>
        <button className="py-6.25 px-5 text-primary-text hover:scale-120 bg-white border border-neutral-200/80 cursor-pointer">
          3
        </button>
        <button className="p-6.25 bg-primary  hover:bg-hover text-white border border-neutral-200/80 rounded-r-sm cursor-pointer">
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
