import {  LayoutGrid, TableOfContents } from "lucide-react";
import { useState } from "react";

export const ViewAndFilterButtons = ({
  setSearchInputs,
  searchInputs,
  setFilter,
  filter,
  setSort,
  sort,
}) => {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  return (
    <div className="flex flex-col justify-center md:flex-row md:justify-between md:px-10 xl:px-20 items-center gap-6 my-6 max-w-7xl xl:mx-auto">
      <div className="text-second-text">
        <h6>Showing all 12 results</h6>
      </div>
      <div className="flex justify-center items-center gap-4">
        <h6 className="text-second-text">Views:</h6>
        <div className="flex justify-center items-center  w-12 h-12 border hover:bg-[#DDDDDD] border-neutral-200/80 shadow-sm rounded-sm bg-white">
          <button>
            <LayoutGrid className="w-4 h-4" fill="black" />
          </button>
        </div>
        <div className="flex justify-center items-center w-12 h-12 border hover:bg-[#DDDDDD] border-neutral-200/80 shadow-sm rounded-sm bg-white">
          <button>
            <TableOfContents style={{ transform: "scaleX(-1)" }} />
          </button>
        </div>
      </div>
      <div className="flex gap-4">
        
         
          <select value={sort} onChange={(e)=>setSort(e.target.value)} className="text-[14px] gap-2 text-second-text border-neutral-200/80 shadow-sm rounded-sm hover:bg-[#DDDDDD] py-3 px-4.5 " name="sort" >
            <option value="price:asc">Fiyata göre Artan</option>
            <option value="price:desc">Fiyata göre Azalan</option>
            <option value="rating:asc">Puana göre artan</option>
            <option value="rating:desc">Puana göre azalan</option>
          </select>
       
        <button className="bg-primary hover:bg-hover  text-light-text px-6.5 rounded-sm">
          <h6>Filter</h6>
        </button>
      </div>
    </div>
  );
};
