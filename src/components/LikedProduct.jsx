import {  ShoppingCart, Trash } from "lucide-react";
import { toast } from "react-toastify";
import { setCart } from "../store/actions/shoppingCartActions";
import { useDispatch } from "react-redux";
import { decrementProductStock } from "../store/actions/productActions";

export default function LikedProduct({ product }) {
  const dispatch = useDispatch();
  const handleAddCart = (product) => {
    toast.success("Ürün sepetinize eklendi");
    const formatedProduct = { count: 1, checked: true, product: product };
    dispatch(setCart(formatedProduct));

    dispatch(decrementProductStock(product.id, 1));
  };
  const handleDelete =(product)=>{
    const allLikedProducts = JSON.parse(localStorage.getItem('liked_products'));
     const adjustedAllLikedProducts =allLikedProducts.filter((item)=>item.id !== product.id)
    localStorage.setItem('liked_products',JSON.stringify(adjustedAllLikedProducts))
  }
  return (
    <div>
      <div className="flex gap-4 border border-gray-200 rounded-xl p-2 text-black">
        <img src={product.images[0]?.url} className="w-20 h-20 " />
        <div className="flex flex-col justify-between">
          <h6>{product.name}</h6>
          <h6>{product.price}</h6>
        </div>
        <div className="flex flex-col justify-between ml-auto">
           <button
            onClick={() => handleAddCart(product)}
            className="self-end ml-auto text-primary-text hover:cursor-pointer"
          >
            <ShoppingCart />
          </button>
          <button onClick={()=>handleDelete(product)} className="text-alert hover:cursor-pointer">
            <Trash />
          </button>
         
        </div>
      </div>
    </div>
  );
}
