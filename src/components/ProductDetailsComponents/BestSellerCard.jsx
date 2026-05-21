import { useHistory } from "react-router-dom";
import { productsData } from "../../data/products";

export function BestSellerCard() {
  const history = useHistory();
  
  return (
    <div>
      <h3 className="px-10 sm:px-6 lg:px-10 xl:px-20 border-b border-dotted border-second-text text-center md:text-start pb-4 my-6">
        BESTSELLER PRODUCTS
      </h3>
      <div className="px-10 sm:px-6 lg:px-10 xl:px-20 flex flex-col md:flex-row flex-wrap gap-7.5 max-w-7xl xl:mx-auto">
        {productsData.slice(0, 8).map((card, index) => (
          <div 
            key={card.id} 
            onClick={() => history.push(`/productDetails/${card.id}`)} // Tıklanınca o ürüne gitmesini sağladık
            className={`bg-light-bg flex-col gap-2 w-full sm:w-[calc(50%-12px)] md:w-[calc(25%-28px)] cursor-pointer transition-transform hover:scale-102 ${
              index >= 4 ? "hidden lg:flex" : "flex"
            }`}
          >
            <div className="flex flex-col justify-center items-start gap-4">
              <img src={card.img} className="w-full object-cover" alt={card.title} />
              <div className="p-4">
                <h5>{card.title}</h5>
                <a className="link">English Department</a>
                <div className="flex gap-3">
                  <h5 className="text-muted">{card.actualPrice}</h5>
                  <h5 className="text-secondary-1">{card.salePrice}</h5>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}