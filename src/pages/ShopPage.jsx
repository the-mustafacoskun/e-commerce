import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { BrandsFav } from "../components/ShopComponents/BrandsFav";
import { CategoryCard } from "../components/ShopComponents/CategoryCard";
import { ViewAndFilterButtons } from "../components/ShopComponents/ViewAndFilterButtons";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchProductLists, setProductList } from "../store/actions/productActions";

function ShopPage() {
  const categories = useSelector((store) => store.product.categories);
  const products = useSelector((store) => store.product.productList);
  const { gender, categoryName, categoryId } = useParams();
   const dispatch = useDispatch();
  const colorsVariants = [
    "bg-amber-500",
    "bg-blue-600",
    "bg-green-400",
    "bg-red-300",
  ];
  const totalProducts = useSelector((store) => store.product.total);
  const fetchState = useSelector((store) => store.product.fetchState);//"FETCHING"
  console.log("Toplam Ürün Adedi", totalProducts);

  useEffect(()=>{
     dispatch(fetchProductLists(categoryId));
    
  },[categoryId])


  return (
    <div>
      {/* KATEGORİ ALANI */}
      <div className="px-10 bg- sm:px-6 lg:px-10 xl:px-20 py-8 w-full max-w-7xl xl:mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-0">
          {categories
            .filter((category, index, currentArray) => {
              return (
                currentArray.findIndex(
                  (item) => item.title === category.title,
                ) === index
              );
            })
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 5)
            .map((category) => {
              const currentGender = category.gender === "k" ? "kadin" : "erkek";
              const categorySubTitle = category.code.split(":")[1];

              return (
                <CategoryCard
                  link={`/shop/${currentGender}/${categorySubTitle}/${category.id}`}
                  key={category.id}
                  bgImgUrl={category.img}
                  title={category.title}
                  items={category.rating}
                />
              );
            })}
        </div>
      </div>

      <div className="px-10 sm:px-6 lg:px-10 xl:px-20">
        <ViewAndFilterButtons />
      </div>

      {/* ÜRÜNLER ALANI */}
      {fetchState === "FETCHING" && (
        <div className="flex flex-col items-center justify-center min-h-[300px] w-full">
          {/* Büyük ve şık bir Tailwind Spinner */}
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
          <p className="text-gray-500 mt-4 font-medium animate-pulse">
            Ürünler hazırlanıyor, lütfen bekleyin...
          </p>
        </div>
      )}
      {fetchState === "FETCHED" && (
        <div className="my-15 px-10 sm:px-6 lg:px-10 xl:px-20 max-w-7xl xl:mx-auto">
          <div className="flex flex-wrap gap-6">
            {products.products?.map((product) => (
              <div
                key={product.id}
                className="w-full 
                         sm:w-[calc(50%-12px)]
                         md:w-[calc(33.33%-16px)] 
                         lg:w-[calc(25%-18px)]"
              >
                <ProductCard
                  id={product.id}
                  bgImgUrl={product.images[0].url}
                  title={product.title}
                  actualPrice={product.price}
                  salePrice={product.price}
                  colors={colorsVariants}
                />
              </div>
            ))}
          </div>
        </div>
      )}

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
        <BrandsFav />
      </div>
    </div>
  );
}

export default ShopPage;
