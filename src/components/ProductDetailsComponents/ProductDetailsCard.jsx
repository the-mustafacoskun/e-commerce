import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  ShoppingCart,
} from "lucide-react";
import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import ProductRewievForm from "./ProductRewievForm.jsx";
import { useHistory } from "react-router-dom";
import { api } from "../../api";
import { setCart } from "../../store/actions/shoppingCartActions";
import { useDispatch } from "react-redux";
import ProductRating from "./ProductRating";
import { toast } from "react-toastify";
import { decrementProductStock } from "../../store/actions/productActions.js";

export function ProductDetailsCard() {
  const colorsVariants = [
    "bg-amber-500",
    "bg-blue-600",
    "bg-green-400",
    "bg-red-300",
  ];
  const history = useHistory();
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [isClicked, setIsClicked] = useState(false);
  const [options, setOptions] = useState("description");
  const [state, setState] = useState({
    product: null,
    loading: true,
    error: null,
  });

  const handleAddCart = (product) => {
    toast.success("Ürün sepetinize eklendi");
    const formatedProduct = { count: 1, checked: true, product: product };
    dispatch(setCart(formatedProduct));
    setIsClicked(true);
    dispatch(decrementProductStock(product.id, 1));
    setState((prev) => ({
      ...prev,
      product: {
        ...prev.product,
        stock: Math.max(0, prev.product.stock - 1),
      },
    }));

    setTimeout(() => {
      setIsClicked(false);
    }, 2000);
  };
  const handleLikeClick =()=>{
    const savedLikes =localStorage.getItem('liked_products');
    let likesArray =savedLikes ? JSON.parse(savedLikes):[];
    const isAlreadyLiked =likesArray.some((item)=>item.id ===product.id)
    if(!isAlreadyLiked){
      likesArray.push(product);
      localStorage.setItem('liked_products',JSON.stringify(likesArray));
      toast.success('Ürün Favorilere Eklendi!');
      
    }else {
      likesArray = likesArray.filter((item)=>item.id !==product.id);
      localStorage.setItem('liked_products',JSON.stringify(likesArray));
      toast.warn('Ürün Favorilerden Çıkarıldı');
    }
  }
  useEffect(() => {
    api
      .get(`/products/${productId}`)
      .then((res) => {
        setState({ product: res.data, loading: false, error: null });
      })
      .catch((err) => {
        setState({
          product: null,
          loading: false,
          error: err.response?.status || err.message,
        });
      });
  }, [productId]);

  const { product, loading, error } = state;

  if (loading)
    return (
      <div className="py-12 text-center text-primary font-bold text-lg animate-pulse">
        Ürün detayları yükleniyor...
      </div>
    );

  if (error || !product)
    return (
      <div className="py-12 text-center text-danger-text font-bold">
        Ürün bulunamadı! Hata: {error}
      </div>
    );

  return (
    <div className="w-full [&>div:nth-child(even)]:bg-light-bg flex flex-col">
      {/*  ÜRÜN ANA KARTI */}

      <div className="relative w-full flex flex-col py-8">
        <div
          onClick={() => {
            history.goBack();
            window.scrollTo(0, 0);
          }}
          className="absolute top-0  z-20 mb-6 hover:cursor-pointer text-primary flex items-center hover:scale-110"
        >
          <button>
            <ChevronLeft className="w-8 h-8 ml-10 " />
          </button>
          <span>Back</span>
        </div>
        <div className="px-10 sm:px-6 lg:px-10 xl:px-20 flex flex-col md:flex-row md:gap-7.5 max-w-7xl xl:mx-auto">
          {/* Sol Kolon: Görseller */}
          <div className="flex flex-col gap-5 flex-1">
            <div className="relative w-full h-fit overflow-hidden">
              <img
                src={product.images[0]?.url}
                alt={product.name}
                className="w-full object-contain block"
              />
              <button className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full hover:bg-black/20 text-white transition-all cursor-pointer group">
                <ChevronLeft className="w-12 h-12 md:w-14 md:h-14 group-hover:scale-120 transition-transform" />
              </button>
              <button className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full hover:bg-black/20 text-white transition-all cursor-pointer group">
                <ChevronRight className="w-12 h-12 md:w-14 md:h-14 group-hover:scale-120 transition-transform" />
              </button>
            </div>

            {/* Küçük Detay Resimleri */}
            <div className="flex gap-5">
              <img
                src={product.images[0]?.url}
                className="w-25 h-18.75 lg:aspect-auto lg:h-auto lg:flex-1 xl:h-18.75 xl:flex-none object-cover cursor-pointer hover:scale-120"
                alt="detail 1"
              />
              <img
                src={product.images[0]?.url}
                className="w-25 h-18.75 object-cover lg:h-auto lg:aspect-square lg:flex-1 xl:h-18.75 xl:flex-none cursor-pointer hover:scale-120"
                alt="detail 2"
              />
            </div>
          </div>

          {/* Sağ Kolon: Detay Bilgileri */}
          <div className="flex flex-col gap-4 my-2 p-6 flex-1">
            <h4>{product.name}</h4>
            <div className="flex gap-3">
              {/*Filling stars*/}
              <ProductRating rating={product.rating} readOnly={true} />

              <h6 className="text-second-text">{product.rating} </h6>
            </div>
            <div className="flex flex-col gap-2 mt-3">
              <h3>${product.price}</h3>
              <div className="flex gap-2">
                <h6 className="text-second-text">Availability :</h6>
                <h6
                  className={`${product.stock > 0 ? "text-primary" : "text-danger-text"}`}
                >
                  {product.stock ? "In Stock" : "Out Of Stock"} {product.stock}
                </h6>
              </div>
            </div>
            <p className="text-[#858585] border-b pb-4">
              {product.description}
            </p>
            <div className="flex flex-col gap-12">
              <div className="flex gap-2.5">
                {colorsVariants.map((color, index) => (
                  <div
                    key={index}
                    className={`w-7.5 h-7.5 ${color} rounded-full hover:scale-120`}
                  />
                ))}
              </div>

              {/* Butonlar */}
              <div className="flex gap-2.5">
                <button
                  onClick={() => handleAddCart(product)}
                  className={`px-5 py-2.5 bg-primary hover:bg-hover text-light-text rounded-sm ${isClicked ? "bg-second-text" : " bg-primary hover:bg-hover"}`}
                >
                  <h6>Sepete Ekle</h6>
                </button>
                <button onClick={handleLikeClick} className="w-10 h-10 bg-light-bg rounded-full flex items-center justify-center hover:scale-120 hover:bg-gray-200">
                  <Heart strokeWidth={1.5} className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 bg-light-bg rounded-full flex items-center justify-center hover:scale-120 hover:bg-gray-200">
                  <ShoppingCart strokeWidth={1.5} className="w-5 h-5 " />
                </button>
                <button className="w-10 h-10 bg-light-bg rounded-full flex items-center justify-center hover:scale-120 hover:bg-gray-200">
                  <Eye strokeWidth={1.5} className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full py-8">
        <div className="px-10 sm:px-6 lg:px-10 xl:px-20 flex flex-col gap-8 justify-center items-center max-w-7xl xl:mx-auto">
          {/* Subheader Menü */}
          <div className="w-full text-sm pb-2 pt-6 flex gap-4 justify-between md:justify-center md:gap-7.5 font-bold [&_button]:hover:border-b [&_button]:text-second-text">
            <button onClick={() => setOptions("description")}>
              Description
            </button>

            <button>Additional Information</button>

            <button onClick={() => setOptions("reviews")}>
              Reviews
              <span className="text-secondary-1 ml-1">
               ( {(() => {
                 
                  const savedReviews = localStorage.getItem("product_reviews");
                  if (!savedReviews) return 0;

                  try {
                   
                    const allReviews = JSON.parse(savedReviews) ||[];

                    // Sadece mevcut productId ile eşleşen yorumları filtreleyip uzunluğunu alalım
                    if (Array.isArray(allReviews)) {
                      return allReviews?.filter(
                        (r) => String(r.productId) === String(productId),
                      )?.length;
                    }
                    return 0;
                  } catch (e) {
                    console.error("Yorumlar okunurken hata oluştu:", e);
                    return 0;
                  }
                })()} )
              </span>
            </button>
          </div>

          {/* Detay İçerik Alanı */}
          {options === "description" && (
            <div className="w-full flex flex-col md:flex-row gap-7.5 py-8 md:border-t border-dotted">
              {/* Sol Resim Bloğu */}
              <div className="flex flex-col gap-8 flex-1">
                <div className="relative w-fit h-fit overflow-visible group">
                  <div className="absolute inset-0 bg-[#252B42]/15 rounded-lg translate-x-3 translate-y-3 z-0 transition-transform group-hover:translate-x-4 group-hover:translate-y-4" />
                  <img
                    src={product?.images[0]?.url}
                    className="w-full max-h-100 object-cover rounded-lg z-10 relative block border border-gray-100"
                    alt="Product Detail"
                  />
                </div>
              </div>

              {/* Orta Yazı Bloğu */}
              <div className="p-4 md:p-0 flex flex-col gap-7.5 flex-1">
                <h3>the quick fox jumps over </h3>
                <p className="text-second-text">
                  Met minim Mollie non desert Alamo est sit cliquey dolor do met
                  sent. RELIT official consequent door ENIM RELIT Mollie.
                  Excitation venial consequent sent nostrum met. Met minim
                  Mollie non desert Alamo est sit cliquey dolor do met sent.
                  RELIT official consequent door ENIM RELIT Mollie. Excitation
                  venial consequent sent nostrum met. Met minim Mollie non
                  desert Alamo est sit cliquey dolor do met sent. RELIT official
                  consequent door ENIM RELIT Mollie. Excitation venial
                  consequent sent nostrum met.
                </p>
              </div>

              {/* Sağ Liste Blokları */}
              <div className="flex flex-col gap-4 flex-1">
                <div className="flex-1 flex flex-col gap-4">
                  <h3>{product.name}</h3>
                  <div className="text-second-text flex flex-col gap-2">
                    {product.description
                      .split(" ")
                      ?.filter((item) => item !== "")
                      .map((item, index) => {
                        return (
                          <div key={index} className="flex items-center gap-2">
                            <ChevronRight className="w-4 h-4" />
                            <h6>{item}</h6>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          )}
          {options === "reviews" && (
            <div className="w-full flex flex-col md:flex-row gap-7.5 py-8 md:border-t border-dotted">
              <ProductRewievForm
                product={product}
                onLocalRatingUpdate={(newRating) => {
                  setState((prev) => ({
                    ...prev,
                    product: {
                      ...prev.product,
                      rating: Number(
                        ((newRating + prev.product.rating) / 2).toFixed(2),
                      ),
                    },
                  }));
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
