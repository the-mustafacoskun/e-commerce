// SubCategoryCard.jsx
export function HalfSubCategoryCard({ bgImgUrl, title }) { 
  return (
    <div
      style={{ backgroundImage: `url(${bgImgUrl})` }}
      className="w-full aspect-3/2 md:aspect-auto md:h-full bg-cover bg-center bg-no-repeat flex flex-col justify-end items-start"
    >
      <button className=" h-12 bg-white m-7 px-6 hover:bg-gray-100 transition-colors">
        <h5 className="font-bold">{title}</h5>
      </button>
    </div>
  );
}