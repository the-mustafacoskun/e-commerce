import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { BrandsFav } from "../components/ShopComponents/BrandsFav";
import { CategoryCard } from "../components/ShopComponents/CategoryCard";
import { ViewAndFilterButtons } from "../components/ShopComponents/ViewAndFilterButtons";
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  fetchProductLists,
  setFetchState,
  setFilter,
  setOffset,
} from "../store/actions/productActions";
import { api } from "../api";
import ProductCardList from "../components/ProductCardList";

function ShopPage() {
  const categories = useSelector((store) => store.product.categories);
  const limit = useSelector((store) => store.product.limit) || 25;
  const offset = useSelector((store) => store.product.offset) || 0;
  const fetchState = useSelector((store) => store.product.fetchState);
  const currentFilter = useSelector((store) => store.product.filter);
  const { categoryId, gender } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [categoryCounts, setCategoryCounts] = useState({});
  const [allProducts, setAllProducts] = useState([]);

  // true: Grid görünümü, false: list  görünümü
  const [productsDisplay, setProductsDisplay] = useState(true);

  const colorsVariants = [
    "bg-amber-500",
    "bg-blue-600",
    "bg-green-400",
    "bg-red-300",
  ];
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
  const [sort, setSort] = useState("");

  // 1. Tüm ürünleri çekip kategorilerdeki ürün sayısını hesaplama
  useEffect(() => {
    if (!categories || categories.length === 0) return;

    api.get("/products?limit=2000").then((res) => {
      const rawProducts = res.data.products || [];
      setAllProducts(rawProducts);

      const counts = {};
      rawProducts.forEach((p) => {
        counts[p.category_id] = (counts[p.category_id] || 0) + 1;
      });
      setCategoryCounts(counts);
      
    });
  }, [categories]);

  // 2. Filtreleme Mantığı
  const filteredProducts = allProducts
    .filter((product) => {
      if (categoryId && product.category_id !== Number(categoryId))
        return false;

      const category = categories.find((cat) => cat.id === product.category_id);
      const productGender = category?.gender === "k" ? "kadin" : "erkek";

      if (!gender) return true;
      return productGender === gender;
    })
    .filter((p) => {
      if (!currentFilter) return true;
      return p.name.toLowerCase().includes(currentFilter.toLowerCase());
    })
    .filter((p) => p.price >= priceRange.min && p.price <= priceRange.max);

  // 3. Sıralama Mantığı
  const sortedProducts = [...filteredProducts];
  if (sort === "price:asc") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "price:desc") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sort === "rating:desc") {
    sortedProducts.sort((a, b) => b.rating - a.rating);
  }

  // 4. Dinamik Sayfalama Hesapları
  const currentTotal = sortedProducts.length;
  const totalPage = Math.ceil(currentTotal / Number(limit));
  const currentPage = Math.floor(offset / limit);

  const pages = [];
  for (let i = 0; i < totalPage; i++) {
    if (i === totalPage - 1 || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  // 5. Sayfalanmış Ürün Dilimi
  const displayedProducts = sortedProducts.slice(offset, offset + limit);

  // URL Query Parametreleri Güncelleme
  useEffect(() => {
    const newParams = new URLSearchParams(window.location.search);
    currentFilter
      ? newParams.set("filter", currentFilter)
      : newParams.delete("filter");
    sort ? newParams.set("sort", sort) : newParams.delete("sort");
    limit ? newParams.set("limit", limit) : newParams.delete("limit");
    offset ? newParams.set("offset", offset) : newParams.delete("offset");
    history.push({ search: newParams.toString() });
  }, [sort, currentFilter, history, limit, offset]);

  useEffect(() => {
    dispatch(fetchProductLists(categoryId, sort));
  }, [categoryId, sort, offset, dispatch]);

  // Kategori veya Cinsiyet Değiştiğinde Sayfa Sıfırlama
  useEffect(() => {
    dispatch(setFilter(""));
    dispatch(setOffset(0));
  }, [categoryId, gender, dispatch]);
  // Filtrelerden herhangi biri değiştiğinde sayfayı otomatik olarak 1. sayfaya (0) sıfırlar
  useEffect(() => {
    dispatch(setOffset(0));
  }, [currentFilter, sort, priceRange.min, priceRange.max, dispatch]);

  return (
    <div>
      {/* KATEGORİ ALANI */}
      <div className="px-10 sm:px-6 lg:px-10 xl:px-20 py-8 w-full max-w-7xl xl:mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {categories
            .filter((category) => {
              const isGenderMatch =
                (gender === "erkek" && category.gender === "e") ||
                (gender === "kadin" && category.gender === "k") ||
                !gender;
              return isGenderMatch;
            })
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

      {/* FİLTRELEME VE GÖRÜNÜM BUTONLARI */}
      <div className="px-10 sm:px-6 lg:px-10 xl:px-20">
        <ViewAndFilterButtons
          sort={sort}
          setSort={setSort}
          onPriceFilter={(min, max) => setPriceRange({ min, max })}
          productLength={filteredProducts.length}
          setProductsDisplay={setProductsDisplay}
          productsDisplay={productsDisplay}
        />
      </div>

      {/* LOADING (YÜKLENİYOR) EKRANI */}
      {fetchState === "FETCHING" && (
        <div className="flex flex-col items-center justify-center min-h-75 w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600" />
          <p className="text-gray-500 mt-4 font-medium animate-pulse">
            Ürünler hazırlanıyor, lütfen bekleyin...
          </p>
        </div>
      )}

      {/* ÜRÜN LİSTELEME ALANI */}
      {fetchState === "FETCHED"  && (
        <div className="my-15 px-10 sm:px-6 lg:px-10 xl:px-20 max-w-7xl xl:mx-auto">
          {displayedProducts && displayedProducts?.length > 0 && (
            /* productsDisplay durumuna göre flex düzenini dinamik değiştiriyoruz */
            <div
              className={`flex flex-wrap ${productsDisplay ? "gap-6" : "flex-col gap-4"}`}
            >
              {displayedProducts.map((product) => {
                const category = categories.find(
                  (cat) => cat.id === product.category_id,
                );
                const pGender = category?.gender === "k" ? "kadin" : "erkek";
                const categoryName = category?.code?.split(":")[1] || "urun";

                return !productsDisplay ? (
                  <div key={product.id} className="w-full">
                    <ProductCardList
                      id={product.id}
                      bgImgUrl={product.images[0]?.url}
                      title={product.name}
                      actualPrice={product.price}
                      salePrice={product.price}
                      colorsVariants={colorsVariants}
                      categoryId={product.category_id}
                      gender={pGender}
                      categoryName={categoryName}
                      originalProduct={product}
                    />
                  </div>
                ) : (
                  /* GRID  */
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
                      gender={pGender}
                      categoryName={categoryName}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* SAYFALAMA (PAGINATION) */}
      <div className="flex justify-center items-center my-10 gap-1">
        <button
          disabled={offset === 0}
          onClick={() => dispatch(setOffset(0))}
          className="px-4 py-3 sm:px-6.25 sm:py-6.25 bg-[#F3F3F3] hover:bg-[#DDDDDD] border border-neutral-200/80 text-neutral-600 rounded-l-sm cursor-pointer text-sm sm:text-base disabled:opacity-50"
        >
          First
        </button>
        {totalPage > 4
          ? pages.map((page, index) => {
              if (page === "...") {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-3 py-3 sm:py-6.25 sm:px-5 text-gray-400 text-sm sm:text-base select-none"
                  >
                    ...
                  </span>
                );
              }

              const isCurrentPage = currentPage === page;

              return (
                <button
                  key={page}
                  onClick={() => dispatch(setOffset(page * limit))}
                  className={`px-3 py-3 sm:py-6.25 sm:px-5 hover:scale-120 ${
                    isCurrentPage
                      ? "bg-primary text-light-text"
                      : "bg-white text-primary-text"
                  } border border-neutral-200/80 cursor-pointer text-sm sm:text-base`}
                >
                  {page + 1}
                </button>
              );
            })
          : Array.from({ length: totalPage }).map((_, index) => {
              const isCurrentPage = offset === index * limit;
              return (
                <button
                  key={index}
                  onClick={() => dispatch(setOffset(index * limit))}
                  className={`px-3 py-3 sm:py-6.25 sm:px-5 hover:scale-120 ${
                    isCurrentPage
                      ? "bg-primary text-light-text"
                      : "bg-white text-primary-text"
                  } border border-neutral-200/80 cursor-pointer text-sm sm:text-base`}
                >
                  {index + 1}
                </button>
              );
            })}

        <button
          disabled={offset + limit >= currentTotal}
          onClick={() => dispatch(setOffset(offset + limit))}
          className={`px-4 py-3 sm:px-6.25 sm:py-6.25 ${
            offset + limit >= currentTotal
              ? "bg-[#F3F3F3] text-neutral-600"
              : "bg-white text-primary"
          } hover:bg-hover border border-neutral-200/80 rounded-r-sm cursor-pointer text-sm sm:text-base disabled:opacity-50`}
        >
          Next
        </button>
      </div>

      <BrandsFav />
    </div>
  );
}

export default ShopPage;
