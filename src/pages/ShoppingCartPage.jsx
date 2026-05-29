import ShoppingCartCard from "../components/ShoppingCartComponents/ShoppingCartCard";
import { useSelector } from "react-redux";
import SummaryBox from "../components/ShoppingCartComponents/SummaryBox";

function ShoppingCartPage() {
  const cartProducts = useSelector((store) => store.shoppingCart.cart);
  const totalCartProducts = cartProducts.reduce(
    (total, item) => total + item.count,
    0,
  );
  const totalCartPrice = cartProducts
    .reduce(
      (total, item) =>
        item.checked === true ? total + item.product.price * item.count : total,
      0,
    )
    .toFixed(2);

  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto px-4 py-10 text-black">
      <div className="flex flex-col gap-6   rounded-lg h-auto  px-10 sm:px-6 lg:px-10 xl:px-20 py-10 bg-white border border-gray-200">
        <div className="flex flex-col gap-4">
          <h4>Sepetim ({totalCartProducts} ürün)</h4>
          {cartProducts.map((cart) => {
            return <ShoppingCartCard key={cart.id} cart={cart} />;
          })}
        </div>
        {cartProducts.length > 0 && (
          <div className="flex justify-end gap-12 pr-20  ">
            <h5>Toplam</h5>
            <h5 className="text-alert-text">{totalCartPrice}$</h5>
          </div>
        )}
      </div>
      <SummaryBox totalCartPrice={totalCartPrice} />
    </div>
  );
}

export default ShoppingCartPage;
