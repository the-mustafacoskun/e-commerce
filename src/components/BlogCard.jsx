import { AlarmClock, ChartArea, ChevronRight } from "lucide-react";

export function BlogCard({bgImgUrl}) {
  return (
    <div className="flex flex-col mx-10.5 pb-8 md:mx-0 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 gap-6 bg-white overflow-hidden">
      <div className="relative">
        <img src={bgImgUrl} className="w-full object-cover" alt="Blog" ></img>
        <div className="absolute top-5 left-5 bg-danger rounded-sm text-white z-10 px-2.5">NEW</div>
        
      </div>
      <div className="flex flex-col gap-6 mx-6">
        <div className="flex gap-4 text-[12px] leading-4 tracking-[0.2px]">
          <span className="text-disabled-text">Google</span>
          <span>Trending</span>
          <span>New</span>
        </div>
        <h4>Loudest à la Madison #1 (L'integral)</h4>
        <p className="text-second-text">
          We focus on ergonomics and meeting you where you work. It's only a
          keystroke away.
        </p>
        <div className="flex justify-between">
            <div className="flex justify-center items-center gap-2">
                <AlarmClock className="text-primary-text" />
                <span className="text-[12px] leading-4 tracking-[0.2px]">22 April 2026</span>
            </div>
            <div className="flex justify-center items-center gap-2">
                <ChartArea className="text-secondary-1 stroke-1.5" />
                <span className="text-[12px] leading-4 tracking-[0.2px]">10 Comments</span>
            </div>
        </div>
        <div className="flex">
            <h6>Learn More</h6>
            <button>
                <ChevronRight className="text-primary-text"/>
            </button>
        </div>
      </div>
    </div>
  );
}
