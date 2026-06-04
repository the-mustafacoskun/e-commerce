import { Link } from "react-router-dom/cjs/react-router-dom.min";

// SubCategoryCard.jsx
export function SubCategoryCard({ bgImgUrl, title }) {
  const urlTitle =title.toLowerCase();
  return (
    <Link to={`/shop/${urlTitle}`}>
      <div
        style={{ backgroundImage: `url(${bgImgUrl})` }}
        className="w-full aspect-3/4 bg-cover bg-center bg-no-repeat flex flex-col justify-end items-start"
      >
        <button className=" h-12 bg-white m-9 px-6 hover:bg-gray-200 hover:scale-120 transition-colors">
          <h5 className="font-bold">{title}</h5>
        </button>
      </div>
    </Link>
  );
}
