import { Handbag } from "lucide-react";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { setCart } from "../store/actions/shoppingCartActions";
import { useDispatch } from "react-redux";
import ProductRating from "./ProductDetailsComponents/ProductRating";

export default function ProductCardList({
  id,
  bgImgUrl,
  title,
  actualPrice,
  salePrice,
  colorsVariants = [],
  categoryId,
  gender,
  categoryName,
 
  originalProduct 
}) {
  const history = useHistory();
  const nameSlug = title?.toLowerCase().replace(/\s+/g, "-");
  const [selectedColor, setSelectedColor] = useState(colorsVariants[0] || "");
  const dispatch = useDispatch();

  const handleCardClick = useCallback(() => {
    if (!id) return;
    history.push(
      `/shop/${gender}/${categoryName}/${categoryId}/${nameSlug}/${id}`,
    );
  }, [history, gender, categoryName, categoryId, nameSlug, id]);

  
  const handleAddCart = () => {
    const formattedProduct = {
      count: 1,
      checked: true,
      product: originalProduct || {
        id: id,
        name: title,
        price: salePrice,
        images: [{ url: bgImgUrl }],
        category_id: categoryId
      }
    };
    dispatch(setCart(formattedProduct));
  };

  
  if (!id) {
    return (
      <div className="py-4 px-6 bg-red-50 text-red-500 rounded-xl text-sm border border-red-100">
        Ürün ID Eksik!
      </div>
    );
  }

  return (
    <div
      className="group flex flex-col sm:flex-row bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer w-full"
      onClick={handleCardClick}
    >
      {/* Sol Taraf: Görsel Alanı */}
      <div className="w-full sm:w-72 h-60 sm:h-80 relative bg-gray-50 shrink-0 overflow-hidden">
        <img
          src={bgImgUrl || "/product-cover-5 (5).png"}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-102"
          alt={title}
        />
        {actualPrice > salePrice && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">
            İNDİRİM
          </span>
        )}
      </div>

      {/* Sağ Taraf: Detaylar */}
      <div className="flex flex-col flex-1 p-6 justify-between gap-4">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              {categoryName || "English Department"}
            </span>
            <ProductRating rating={originalProduct.rating} readOnly={true} />
          </div>

          <h5 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
            {title}
          </h5>

          <p className="text-sm text-gray-500 mt-1 line-clamp-2 hidden sm:block">
            Şıklığı ve konforu bir arada sunan bu özel tasarım {categoryName}, gardırobunuzun vazgeçilmezi olacak.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-gray-900">
                {`$${salePrice}`}
              </span>
              {actualPrice > salePrice && (
                <span className="text-sm text-gray-400 line-through font-medium">
                  {`$${actualPrice}`}
                </span>
              )}
            </div>

            <div
              className="flex gap-1.5 items-center mt-1"
              onClick={(e) => e.stopPropagation()}
            >
              {colorsVariants.map((color, index) => (
                <label key={index} className="relative flex items-center justify-center cursor-pointer">
                  <input
                    type="radio"
                    name={`list-color-${id}`}
                    checked={selectedColor === color}
                    onChange={() => setSelectedColor(color)}
                    className="sr-only"
                  />
                  <span
                    className={`w-4 h-4 rounded-full ${color} border border-black/10 transition-transform duration-200 hover:scale-125 block
                      ${selectedColor === color ? 'ring-2 ring-offset-1 ring-blue-500 scale-110' : ''}`}
                  />
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation(); 
              handleAddCart();     
            }}
            className="flex items-center justify-center gap-2 bg-primary hover:bg-hover text-white font-medium text-sm px-6 py-3 rounded-xl transition-colors duration-200 active:scale-95 shadow-sm w-full sm:w-auto"
          >
            <Handbag className="w-5 h-5" />
            Sepete Ekle
          </button>
        </div>
      </div>
    </div>
  );
}
