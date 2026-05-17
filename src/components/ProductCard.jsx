import { useHistory } from "react-router-dom";

function ProductCard({ id,bgImgUrl, title, actualPrice, salePrice }) {
  const history =useHistory()
  return (
    <div className="w-full" onClick={() => history.push(`/productDetails/${id}`)}>
      <div className="flex flex-col justify-center items-center gap-4">
        
        <img 
          src={bgImgUrl} 
          className="w-full min-h-105 object-cover" 
          alt={title} 
        />
        <h5>{title}</h5>
        <a className="link">English Department</a>
        <div className="flex gap-3">
          <h5 className="text-muted">{actualPrice}</h5>
          <h5 className="text-secondary-1">{salePrice}</h5>
        </div>
        <div className="flex gap-3">
          <label className="flex items-center cursor-pointer">
            <input type="radio" name="color" className="sr-only peer" />
            <div className="w-4 h-4 rounded-full bg-primary peer-checked:ring-2 peer-checked:ring-offset-2 peer-checked:ring-primary transition-all"></div>
          </label>
          <label className="flex items-center cursor-pointer">
            <input type="radio" name="color" className="sr-only peer" />
            <div className="w-4 h-4 rounded-full bg-alert peer-checked:ring-2 peer-checked:ring-offset-2 peer-checked:ring-primary transition-all"></div>
          </label>
          <label className="flex items-center cursor-pointer">
            <input type="radio" name="color" className="sr-only peer" />
            <div className="w-4 h-4 rounded-full bg-dark-bg peer-checked:ring-2 peer-checked:ring-offset-2 peer-checked:ring-primary transition-all"></div>
          </label>
          <label className="flex items-center cursor-pointer">
            <input type="radio" name="color" className="sr-only peer" />
            <div className="w-4 h-4 rounded-full bg-secondary-1 peer-checked:ring-2 peer-checked:ring-offset-2 peer-checked:ring-primary transition-all"></div>
          </label>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;