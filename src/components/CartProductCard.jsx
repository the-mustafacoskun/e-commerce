import { Trash } from "lucide-react";
import { useDispatch } from "react-redux";
import { deleteCartItem } from "../store/actions/shoppingCartActions";

export default function CartProductCard({cart}) {
    const dispatch = useDispatch();
  return (
    <div className="flex gap-4 w-full border-b border-b-gray-200 text-black py-4 items-stretch">
      <img src={cart.product.images?.[0]?.url} alt={cart.product.name} className="w-25 h-25 border border-zinc-300 rounded-lg"></img>
      <div className="flex flex-col flex-1 justify-between ">
        <div className="flex gap-4">
          <h4>{cart.product.name}</h4>
          <p>{cart.product.description}</p>
        </div>
        <div className="flex text-gray-400 gap-4">
          <h6>Size :34</h6>
          <h6>Adet: {cart.count}</h6>
        </div>
        <div className="flex justify-between">
          <h5 className="text-alert-text"> {(cart.product.price)}$</h5>
          <button onClick={()=>dispatch(deleteCartItem(cart))} className="pr-4 flex gap-1 items-center text-[12px]  text-second-text  hover:cursor-pointer"><Trash strokeWidth={1} /><span>Sil</span></button>
        </div>
      </div>
    </div>
  );
}
