import { useSelector } from "react-redux";
import CartProductCard from "./CartProductCard";
import { useHistory } from "react-router-dom";

function Cart() {
  const cartProducts = useSelector((store) => store.shoppingCart.cart);
  const totalCartProducts = cartProducts.reduce(
    (total, item) => total + item.count,
    0,
  );
  const history =useHistory();

  return (
    <div className="flex flex-col gap-6 w-110 rounded-lg h-auto  p-4 bg-white border border-gray-200">
      <div className="flex flex-col gap-4">
        <h4>Sepetim ({totalCartProducts} ürün)</h4>
        {cartProducts.map((cart) => {
          return <CartProductCard key={cart.id} cart={cart} />;
        })}
      </div>
      {totalCartProducts>0 && (
        <div className="flex gap-4 mx-6 ">
          <button onClick={()=>history.push('/cart')} className="bg-primary hover:bg-hover hover:cursor-pointer text-light-text p-3 rounded-lg flex-1 ">Sepete Git</button>
          <button className="bg-alert  hover:bg-amber-700 hover:cursor-pointer text-light-text p-3 rounded-lg flex-1">Siparişi Tamamla</button>
        </div>
      )}
    </div>
  );
}

export default Cart;
