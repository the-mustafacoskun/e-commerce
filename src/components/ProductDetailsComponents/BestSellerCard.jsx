import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProductLists } from "../../store/actions/productActions";
import ProductCard from "../ProductCard";

export function BestSellerCard() {
  const colorsVariants = ["bg-amber-500", "bg-blue-600", "bg-green-400", "bg-red-300"];
  const products = useSelector((store) => store.product.productList);
  const categories = useSelector((store) => store.product.categories); // ✅ ekle
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductLists(undefined, "rating:desc"));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h3 className="px-10 sm:px-6 lg:px-10 xl:px-20 border-b border-dotted border-second-text text-center md:text-start pb-4 my-6">
        BESTSELLER PRODUCTS
      </h3>
      <div className="flex flex-wrap justify-center gap-7.5">
        {products?.products?.slice(0, 8).map((product) => {
          // ✅ Her kart için hesapla, ProductCard'a prop olarak geç
          const category = categories?.find(cat => cat.id === product.category_id);
          const gender = category?.gender === "k" ? "kadin" : "erkek";
          const categoryName = category?.code?.split(":")[1] || "urun";

          return (
            <div
              key={product.id}
              className="w-full sm:w-[calc(50%-15px)] md:w-[calc(33.33%-20px)] lg:w-[calc(25%-23px)]"
            >
              <ProductCard
                id={product.id}
                bgImgUrl={product?.images?.[0]?.url}
                title={product.name}
                actualPrice={product.price}
                salePrice={product.price}
                colorsVariants={colorsVariants}
                categoryId={product.category_id}
                gender={gender}           
                categoryName={categoryName} 
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}