import { Link } from "react-router-dom";

export function CategoryCard({ items, title, bgImgUrl,link }) {

  return (
    
    <Link 
     to={link}
    className="block w-full h-80 overflow-hidden rounded-sm group relative hover:cursor-pointer">
      <div className="w-full h-full overflow-hidden relative">
        <img 
          src={bgImgUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-black/25 flex flex-col justify-center items-center gap-2 text-white p-4">
          <h5 className="font-bold tracking-wide text-center">{title}</h5>
          <p className="text-sm font-medium opacity-90">{items} Items</p>
        </div>
      </div>
    </Link>
  );
}