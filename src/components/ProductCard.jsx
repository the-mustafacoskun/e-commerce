
import { useCallback} from "react";
import { useHistory } from "react-router-dom";

function ProductCard({ id,bgImgUrl, title, actualPrice, salePrice ,colorsVariants, categoryId,gender,categoryName}) {
  const history =useHistory()

  
  
 const nameSlug =title?.toLowerCase().replace(/\s+/g, "-");
  
  const handleCardClick = useCallback(() => {
    history.push(`/shop/${gender}/${categoryName}/${categoryId}/${nameSlug}/${id}`);
  }, [history, gender, categoryName, categoryId, nameSlug, id]);
 
 
  return (
    <div className="w-full " onClick={handleCardClick}>
      <div className="flex flex-col justify-center items-center gap-4">
        
        <img 
          src={bgImgUrl || '/product-cover-5 (5).png' } 
          className="w-full min-h-105 object-cover" 
          alt={title} 
        />
        <h5>{title}</h5>
        <a className="link">English Department</a>
        <div className="flex gap-3">
          <h5 className="text-muted">{`$${actualPrice}`}</h5>
          <h5 className="text-secondary-1">{`$${salePrice}`}</h5>
        </div>
        {/*stopPropagation ile detay sayfasına gitmesini engelledik renge basınca 
          ürünün renklerinin renk seçimine göre değişmesi için state te tut renk seçimini
        */}
        <div className="flex gap-3" onClick={(e)=>e.stopPropagation()}>
          {colorsVariants.map((color,index)=>(
            <label key={index} className="flex items-center cursor-pointer">
            <input type="radio" name={`color-${id}`} className="sr-only peer focus:outline-none" />
            <div
              
            className={`w-4 h-4 rounded-full ${color}  hover:scale-120  transition-all`}></div>
          </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;