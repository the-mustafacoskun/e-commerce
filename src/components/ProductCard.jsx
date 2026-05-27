import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function ProductCard({ id,bgImgUrl, title, actualPrice, salePrice ,colorsVariants, categoryId}) {
  const history =useHistory()
  // 1. Redux store'dan tüm kategorileri çekiyoruz
  const categories = useSelector((store) => store.product.categories);
  
  // 2. Ürünün categoryId'sine sahip olan kategoriyi buluyoruz
  const currentCategory = categories?.find(cat => Number(cat.id) === Number(categoryId));
  
  // 3. Kategoriden cinsiyet metnini ("kadin" veya "erkek") türetiyoruz
  const gender = currentCategory?.gender === "k" ? "kadin" : "erkek";
  
  // 4. "k:tisort" veya "e:ayakkabı" formatındaki code alanından kategori adını ayıklıyoruz
  // Eğer kategori henüz yüklenmediyse kırılmasın diye fallback olarak "urun" veriyoruz
  const categoryName = currentCategory?.code ? currentCategory.code.split(":")[1] : "urun";
 
 const nameSlug = title?.toLowerCase().replace(/\s+/g, "-");
 
  return (
    <div className="w-full " onClick={() =>  history.push(`/shop/${gender}/${categoryName}/${categoryId}/${nameSlug}/${id}`)}>
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