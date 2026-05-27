import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { BrandsFav } from "../components/ShopComponents/BrandsFav";
import { CategoryCard } from "../components/ShopComponents/CategoryCard";
import { ViewAndFilterButtons } from "../components/ShopComponents/ViewAndFilterButtons";
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  fetchProductLists,
  setFilter,
  setOffset,
} from "../store/actions/productActions";
import { api } from "../api";

function ShopPage() {
  const categories = useSelector((store) => store.product.categories);
  const products = useSelector((store) => store.product.productList);
  const limit = useSelector((store) => store.product.limit);
  const offset = useSelector((store) => store.product.offset);
  const total = useSelector((store) => store.product.total);

  const totalPage = Math.ceil(Number(total) / Number(limit));

  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const colorsVariants = [
    "bg-amber-500",
    "bg-blue-600",
    "bg-green-400",
    "bg-red-300",
  ];
  // eslint-disable-next-line no-unused-vars
  const totalProducts = useSelector((store) => store.product.total);
  const fetchState = useSelector((store) => store.product.fetchState); //"FETCHING"
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
  const [sort, setSort] = useState("");
  {
    /*filteri searchInput u prop olarak gönder ama öncesinde bak storedan göndermeye*/
  }
  const currenFilter = useSelector((store) => store.product.filter);
  const history = useHistory();
  // 💡 HAKİKİ ÇÖZÜM BURASI: Her kategorinin toplam ürün adedini tutacağımız yer

  const [categoryCounts, setCategoryCounts] = useState({});

  useEffect(() => {
    api
      .get("/products")
      .then((response) => {
        if (response.data && response.data.products) {
          // Ürünleri kategorilerine göre gruplayıp sayıyoruz
          const counts = {};
          response.data.products.forEach((product) => {
            const catId = product.category_id;
            counts[catId] = (counts[catId] || 0) + 1;
          });

          setCategoryCounts(counts);
        }
      })
      .catch((err) => console.error("Kategori sayıları alınamadı:", err));
  }, []);

  useEffect(() => {
    const newParams = new URLSearchParams(window.location.search);
    currenFilter
      ? newParams.set("filter", currenFilter)
      : newParams.delete("filter");
    sort ? newParams.set("sort", sort) : newParams.delete("sort");
    limit?newParams.set("limit", limit) : newParams.delete("limit");
    offset?newParams.set("offset", offset) : newParams.delete("offset");
    history.push({ search: newParams.toString() });
  }, [sort, currenFilter, history,limit,offset]);

  useEffect(() => {
    dispatch(fetchProductLists(categoryId, sort, currenFilter));
  }, [categoryId, sort, currenFilter, offset]);
  useEffect(() => {
    dispatch(setFilter("")); // kategori değişince filter ı sıfırla
    dispatch(setOffset(0));
  }, [categoryId]);

  return (
    <div>
      {/* KATEGORİ ALANI */}
      <div className="px-10 b sm:px-6 lg:px-10 xl:px-20 py-8 w-full max-w-7xl xl:mx-auto">
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

              {
                /*her kategorinin üzerine kendi totali gelecek*/
              }
              const currentCategoryCount = categoryCounts[category.id] || 0;

              return (
                <CategoryCard
                  link={`/shop/${currentGender}/${categorySubTitle}/${category.id}`}
                  key={category.id}
                  bgImgUrl={category.img}
                  title={category.title}
                  items={currentCategoryCount}
                />
              );
            })}
        </div>
      </div>

      <div className="px-10 sm:px-6 lg:px-10 xl:px-20">
        <ViewAndFilterButtons
          sort={sort}
          setSort={setSort}
          onPriceFilter={(min, max) => setPriceRange({ min, max })}
        />
      </div>

      {/* ÜRÜNLER ALANI */}
      {fetchState === "FETCHING" && (
        <div className="flex flex-col items-center justify-center min-h-75 w-full">
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
            {products.products
              ?.filter(
                (p) => p.price >= priceRange.min && p.price <= priceRange.max,
              )
              .map((product) => {
                return (
                  <div
                    key={product.id}
                    className="w-full 
                         sm:w-[calc(50%-12px)]
                         md:w-[calc(33.33%-16px)] 
                         lg:w-[calc(25%-18px)]"
                  >
                    <ProductCard
                      id={product.id}
                      bgImgUrl={product.images[0]?.url}
                      title={product.name}
                      actualPrice={product.price}
                      salePrice={product.price}
                      colorsVariants={colorsVariants}
                      categoryId={product.category_id}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Sayfalama */}
      <div className="flex justify-center items-center my-10 gap-1">
        <button
          onClick={() => dispatch(setOffset(0))}
          className="px-4 py-3 sm:px-6.25 sm:py-6.25 bg-[#F3F3F3]  hover:bg-[#DDDDDD] border border-neutral-200/80 text-neutral-600 rounded-l-sm cursor-pointer text-sm sm:text-base"
        >
          First
        </button>
        {Array.from({ length: totalPage }).map((_, index) => {
          const isCurrentPage = offset ===index*limit
          return (
            <button
            key={index}
              onClick={() => dispatch(setOffset(index * limit))}
              className={`px-3 py-3 sm:py-6.25 sm:px-5  hover:scale-120 ${isCurrentPage?'bg-primary text-light-text': 'bg-white text-primary-text'}  border border-neutral-200/80 cursor-pointer text-sm sm:text-base`}
            >
              {index + 1}
            </button>
          );
        })}

        <button
          disabled={offset+limit>total}
          onClick={() => dispatch(setOffset(offset + limit))}
          className={`px-4 py-3 sm:px-6.25 sm:py-6.25 ${offset+limit>total ? 'bg-[#F3F3F3] text-neutral-600':'bg-white  text-primary'}   hover:bg-hover border border-neutral-200/80 rounded-r-sm cursor-pointer text-sm sm:text-base`}
        >
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
