import { LayoutGrid, TableOfContents } from "lucide-react";
import { useState } from "react";
import Filter from "../Filter";
import { useRef } from "react";

export const ViewAndFilterButtons = ({
  onPriceFilter,
  setSort,
  sort,
  productLength,
  setProductsDisplay,
  
}) => {
  
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  
  return (
    <div>
      <div className="flex flex-col justify-center md:flex-row md:justify-between md:px-10 xl:px-20 items-center gap-6 my-6 max-w-7xl xl:mx-auto">
        <div className="text-second-text">
          <h6>Showing all {productLength} results</h6>
        </div>
        <div className="flex justify-center items-center gap-4">
          <h6 className="text-second-text">Views:</h6>
          <div  onClick={()=>setProductsDisplay(true)} className="flex justify-center items-center  hover:cursor-pointer w-12 h-12 border hover:bg-[#DDDDDD] border-neutral-200/80 shadow-sm rounded-sm bg-white">
            <button>
              <LayoutGrid className="w-4 h-4" fill="black" />
            </button>
          </div>
          <div onClick={()=>setProductsDisplay(false)} className="flex justify-center items-center hover:cursor-pointer w-12 h-12 border hover:bg-[#DDDDDD] border-neutral-200/80 shadow-sm rounded-sm bg-white">
            <button className="hover:cursor-pointer" >
              <TableOfContents style={{ transform: "scaleX(-1)" }} />
            </button>
          </div>
        </div>
        <div>
          <div className="flex gap-4">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-[14px] gap-2 text-second-text border-neutral-200/80 shadow-sm rounded-sm hover:bg-gray-200 py-3 px-4.5 "
              name="sort"
            >
              <option value="price:asc">Fiyata göre Artan</option>
              <option value="price:desc">Fiyata göre Azalan</option>
              <option value="rating:asc">Puana göre artan</option>
              <option value="rating:desc">Puana göre azalan</option>
            </select>

            <button
              className="bg-primary hover:bg-hover  text-light-text px-6.5 rounded-sm"
              onClick={()=>setFilterMenuOpen(!filterMenuOpen)}
            >
              <h6>Filter</h6>
            </button>
          </div>
        </div>
      </div>
      { (<div className={`transition-all duration-500 ease-in-out ${filterMenuOpen?'opacity-100 max-h-full visible':'max-h-0 opacity-0 invisible overflow-hidden'}`}>
        <Filter onPriceFilter={onPriceFilter} />
      </div>)}
    </div>
  );
};
