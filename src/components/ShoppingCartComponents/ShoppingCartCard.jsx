import { useDispatch } from "react-redux";
import {
  decrementProductCount,
  deleteCartItem,
  incrementProductCount,
  toggleProductChecked,
} from "../../store/actions/shoppingCartActions";
import {  Trash } from "lucide-react";
import CheckBox from "../generalElements/CheckBox";

export default function ShoppingCartCard({ cart }) {
  const dispatch = useDispatch();
  return (
    <div className="flex gap-4 w-full border-b border-b-gray-200 text-black py-4 items-stretch">
      <div className="flex gap-4 flex-2">
        <CheckBox text="" value={cart.checked} setValue={() => dispatch(toggleProductChecked(cart))}/>
        
        <img
          src={cart.product.images?.[0]?.url}
          alt={cart.product.name}
          className="w-25 h-25 border border-zinc-300 rounded-lg"
        />
        <div className="flex flex-col justify-around">
          <div className="flex gap-4">
            <h5>{cart.product.name}</h5>
            <p className="truncate w-20 md:w-60">{cart.product.description}</p>
          </div>
          <h6>Size :34</h6>
        </div>
      </div>

      <div className="flex justify-between items-center text-gray-400 gap-4 flex-1">
        <div className="flex gap-3 border h-fit border-gray-200 rounded-sm">
          <button
            onClick={() => dispatch(decrementProductCount(cart))}
            className="w-6 h-6 bg-gray-100 text-secondary-text-2"
          >
            -
          </button>
          <h6>{cart.count}</h6>
          <button
            onClick={() => dispatch(incrementProductCount(cart))}
            className="w-6 h-6 bg-gray-100 text-alert"
          >
            +
          </button>
        </div>
        <h5 className="text-alert-text"> {cart.product.price}$</h5>
        <button
          onClick={() => dispatch(deleteCartItem(cart))}
          className="pr-4 flex gap-1 items-center text-[12px]  text-second-text  hover:cursor-pointer"
        >
          <Trash strokeWidth={1} />
          <span>Sil</span>
        </button>
      </div>
    </div>
  );
}
