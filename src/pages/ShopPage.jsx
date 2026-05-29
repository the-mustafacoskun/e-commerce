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
  const fetchState = useSelector((store) => store.product.fetchState);
  const currentFilter = useSelector((store) => store.product.filter);

  const totalPage = Math.ceil(Number(total) / Number(limit));
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const colorsVariants = ["bg-amber-500", "bg-blue-600", "bg-green-400", "bg-red-300"];
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
  const [sort, setSort] = useState("");

  // tüm ürünleri çekip kategori ürün sayılarını hesaplandı
  const [categoryCounts, setCategoryCounts] = useState({});
  useEffect(() => {
    api.get("/products?limit=1000").then((res) => {
      const counts = {};
      res.data.products.forEach((p) => {
        counts[p.category_id] = (counts[p.category_id] || 0) + 1;
      });
      setCategoryCounts(counts);
    });
  }, []);

  useEffect(() => {
    const newParams = new URLSearchParams(window.location.search);
    currentFilter ? newParams.set("filter", currentFilter) : newParams.delete("filter");
    sort ? newParams.set("sort", sort) : newParams.delete("sort");
    limit ? newParams.set("limit", limit) : newParams.delete("limit");
    offset ? newParams.set("offset", offset) : newParams.delete("offset");
    history.push({ search: newParams.toString() });
  }, [sort, currentFilter, history, limit, offset]);

  useEffect(() => {
    dispatch(fetchProductLists(categoryId, sort));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, sort, currentFilter, offset]);

  useEffect(() => {
    dispatch(setFilter(""));
    dispatch(setOffset(0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  return (
    <div>
      {/* KATEGORİ ALANI */}
      <div className="px-10 sm:px-6 lg:px-10 xl:px-20 py-8 w-full max-w-7xl xl:mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-0">
          {categories
            .filter((category, index, arr) =>
              arr.findIndex((item) => item.title === category.title) === index
            )
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 5)
            .map((category) => {
              const currentGender = category.gender === "k" ? "kadin" : "erkek";
              const categorySubTitle = category.code.split(":")[1];
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

      {fetchState === "FETCHING" && (
        <div className="flex flex-col items-center justify-center min-h-75 w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600" />
          <p className="text-gray-500 mt-4 font-medium animate-pulse">
            Ürünler hazırlanıyor, lütfen bekleyin...
          </p>
        </div>
      )}

      {fetchState === "FETCHED" && (
        <div className="my-15 px-10 sm:px-6 lg:px-10 xl:px-20 max-w-7xl xl:mx-auto">
          <div className="flex flex-wrap gap-6">
            {products.products
              ?.filter((p) => p.price >= priceRange.min && p.price <= priceRange.max)
              .map((product) => {
                const category = categories.find((cat) => cat.id === product.category_id);
                const gender = category?.gender === "k" ? "kadin" : "erkek";
                const categoryName = category?.code?.split(":")[1] || "urun";

                return (
                  <div
                    key={product.id}
                    className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33.33%-16px)] lg:w-[calc(25%-18px)]"
                  >
                    <ProductCard
                      id={product.id}
                      bgImgUrl={product.images[0]?.url}
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
      )}

      {/* Sayfalama */}
      <div className="flex justify-center items-center my-10 gap-1">
        <button
          onClick={() => dispatch(setOffset(0))}
          className="px-4 py-3 sm:px-6.25 sm:py-6.25 bg-[#F3F3F3] hover:bg-[#DDDDDD] border border-neutral-200/80 text-neutral-600 rounded-l-sm cursor-pointer text-sm sm:text-base"
        >
          First
        </button>
        {Array.from({ length: totalPage }).map((_, index) => {
          const isCurrentPage = offset === index * limit;
          return (
            <button
              key={index}
              onClick={() => dispatch(setOffset(index * limit))}
              className={`px-3 py-3 sm:py-6.25 sm:px-5 hover:scale-120 ${isCurrentPage ? "bg-primary text-light-text" : "bg-white text-primary-text"} border border-neutral-200/80 cursor-pointer text-sm sm:text-base`}
            >
              {index + 1}
            </button>
          );
        })}
        <button
          disabled={offset + limit > total}
          onClick={() => dispatch(setOffset(offset + limit))}
          className={`px-4 py-3 sm:px-6.25 sm:py-6.25 ${offset + limit > total ? "bg-[#F3F3F3] text-neutral-600" : "bg-white text-primary"} hover:bg-hover border border-neutral-200/80 rounded-r-sm cursor-pointer text-sm sm:text-base`}
        >
          Next
        </button>
      </div>

      <BrandsFav />
    </div>
  );
}

export default ShopPage;