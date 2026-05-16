import {  ChevronDown, LayoutGrid, TableOfContents } from "lucide-react";

export const ViewAndFilterButtons = () => {
  return (
    <div className="flex flex-col justify-center md:flex-row md:justify-between md:mx-45 items-center gap-6 my-6">
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
        <button className="flex border text-[14px] gap-2 text-second-text border-neutral-200/80 shadow-sm rounded-sm hover:bg-[#DDDDDD] py-3 px-4.5 ">
            Popularity<ChevronDown  className="hover:scale-125"/>
        </button>
        <button className="bg-primary hover:bg-hover  text-light-text px-6.5 rounded-sm"><h6>Filter</h6></button>
      </div>
    </div>
  );
};
