import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setFilter, setOffset } from "../store/actions/productActions";

function Filter({ onPriceFilter }) {
  const [minRangeValue, setMinRangeValue] = useState(0);
  const [maxRangeValue, setMaxRangeValue] = useState(2000);
  const [activeBar, setActiveBar] = useState("min");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedGender, setSelectedGender] = useState("k");
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = useSelector((store) => store.product.categories);
  const currentFilter = useSelector((store) => store.product.filter);
  const [searchTerm, setSearchTerm] = useState(currentFilter || "");
  const dispatch = useDispatch();
  const history = useHistory();

  const colorsVariants = [
    "bg-amber-500",
    "bg-blue-600",
    "bg-green-400",
    "bg-red-300",
  ];

  const handleChange = (category) => {
    setSelectedCategory(category.title);

    setSearchTerm("");

    dispatch(setFilter(""));
    history.push(
      `/shop/${category.gender === "k" ? "kadin" : "erkek"}/${category.code.split(":")[1]}/${category.id}`,
    );
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    dispatch(setFilter(searchTerm));
    dispatch(setOffset(0));
  };

  const uniqueGenders = useMemo(() => {
    return categories.filter(
      (category, index, currentArray) =>
        currentArray.findIndex((item) => item.gender === category.gender) ===
        index,
    );
  }, [categories]);

  const filteredCategories = useMemo(() => {
    return categories
      .filter((category) =>
        selectedGender ? category.gender === selectedGender : true,
      )
      .filter(
        (category, index, currentArray) =>
          currentArray.findIndex((item) => item.title === category.title) ===
          index,
      );
  }, [categories, selectedGender]);

  return (
    <main className="flex flex-col md:mx-20 lg:mx-40 gap-8 my-5 max-w-100 lg:max-w-full">
      <h5 className="-mb-4">Filter :</h5>
      <form onSubmit={handleFilterSubmit}>
        {/* Arama */}
        <div className="relative w-full">
          <button
            type="button"
            aria-label="Search"
            onClick={() => {
              dispatch(setFilter(searchTerm));
              setSearchTerm("");
            }}
            className="hover:text-gray-400 transition-colors absolute top-1/2 left-3 -translate-y-1/2"
          >
            <Search />
          </button>
          <input
            className="bg-[#DDDDDD] w-full h-12 pl-10 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                dispatch(setFilter(searchTerm));
                setSearchTerm("");
              }
            }}
          />
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-between mx-6 [&>div]:py-6 [&>div]:my-6 [&>div]:border-b [&>div]:border-[#E7E7E7] [&>div]:pb-4">
          {/* Cinsiyet */}
          <div className="font-link text-second-text flex flex-col gap-4 lg:flex-1">
            <h5 className="text-black">Cinsiyet</h5>
            {uniqueGenders.map((category) => (
              <div
                key={category.id || category.gender}
                className="flex items-center my-2 select-none"
              >
                <input
                  id={`${category.gender}`}
                  type="radio"
                  name="gender-group"
                  className="sr-only peer"
                  onChange={() => {
                    setSelectedGender(category.gender);
                    setSelectedCategory("");
                  }}
                  checked={selectedGender === category.gender}
                />
                <label
                  htmlFor={`${category.gender}`}
                  className="w-5 h-5 mr-3 flex items-center justify-center border-2 border-gray-300 rounded-full cursor-pointer transition-all peer-checked:bg-primary peer-checked:border-primary peer-focus:ring-2 peer-focus:ring-blue-200"
                >
                  <svg
                    className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </label>
                <label
                  htmlFor={`${category.gender}`}
                  className="text-sm font-medium text-gray-700 cursor-pointer"
                >
                  {category.gender === "k" ? "Kadın" : "Erkek"}
                </label>
              </div>
            ))}
          </div>

          {/* Kategori */}
          <div className="font-link text-second-text flex flex-col gap-4 lg:flex-1">
            <h5>Kategori</h5>
            {filteredCategories.map((category) => (
              <div
                key={category.title}
                className="flex items-center my-2 select-none font-link text-second-text"
              >
                <input
                  id={`${category.title}`}
                  type="radio"
                  name="category-group"
                  className="sr-only peer"
                  value={category.title}
                  checked={category.title === selectedCategory}
                  onChange={() => handleChange(category)}
                />
                <label
                  htmlFor={`${category.title}`}
                  className="w-5 h-5 mr-3 flex items-center justify-center border-2 border-gray-300 rounded-md cursor-pointer transition-all peer-checked:bg-primary peer-checked:border-primary peer-focus:ring-2 peer-focus:ring-blue-200"
                >
                  <svg
                    className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </label>
                <label
                  htmlFor={`${category.title}`}
                  className="text-sm font-medium text-gray-700 cursor-pointer"
                >
                  {category.title}
                </label>
              </div>
            ))}
          </div>

          {/* Renkler */}
          <div className="flex flex-col gap-4 lg:flex-1">
            <h5>Colors</h5>
            <div className="flex flex-col gap-3">
              {colorsVariants.map((color, index) => (
                <label
                  key={index}
                  htmlFor={`color-${index}`}
                  className="flex items-center text-second-text gap-4 cursor-pointer"
                >
                  <input
                    id={`color-${index}`}
                    type="radio"
                    name="product-color"
                    value={color}
                    checked={selectedColor === color}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="sr-only peer focus:outline-none"
                  />
                  <div
                    className={`w-5 h-5 rounded-full ${color} transition-all duration-200 peer-checked:ring-2 peer-checked:ring-offset-2 peer-checked:ring-black`}
                  />
                  <h5>{color.split("-")[1]}</h5>
                </label>
              ))}
            </div>
          </div>

          {/* Fiyat */}
          <div className="flex flex-col gap-6 lg:flex-1">
            <div className="flex items-center justify-between w-full gap-4">
              <div className="flex flex-col flex-1">
                <label>Minimum</label>
                <input
                  id="minInput"
                  value={minRangeValue}
                  className="bg-[#E5E5E5] w-full h-12.5 pl-4 rounded-lg focus:outline-none"
                  onChange={(e) => {
                    const value = Math.min(
                      Number(e.target.value),
                      maxRangeValue - 5,
                    );
                    setMinRangeValue(value);
                    onPriceFilter(value, maxRangeValue); // ✅
                  }}
                />
              </div>
              <span>-</span>
              <div className="flex flex-col flex-1">
                <label>Maksimum</label>
                <input
                  id="maxInput"
                  value={maxRangeValue}
                  className="bg-[#E5E5E5] w-full h-12.5 pl-4 rounded-lg focus:outline-none"
                  onChange={(e) => {
                    const value = Math.max(
                      Number(e.target.value),
                      minRangeValue + 5,
                    );
                    setMaxRangeValue(value);
                    onPriceFilter(minRangeValue, value); // ✅
                  }}
                />
              </div>
            </div>

            {/* Range Slider */}
            <div className="relative h-6 w-full flex items-center">
              <div className="absolute left-0 right-0 h-2 bg-gray-200 rounded-lg z-0" />
              <div
                className="absolute h-2 bg-primary rounded-lg z-10"
                style={{
                  left: `${minRangeValue / 20}%`,
                  width: `${(maxRangeValue - minRangeValue) / 20}%`,
                }}
              />
              <input
                id="min"
                type="range"
                min="0"
                step="1"
                max="2000"
                value={minRangeValue}
                className={`absolute w-full h-full bg-transparent appearance-none cursor-pointer pointer-events-none accent-secondary-2 focus:outline-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-second-text [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto ${activeBar === "min" ? "z-30" : "z-20"}`}
                onChange={(e) => {
                  const value = Math.min(
                    Number(e.target.value),
                    maxRangeValue - 5,
                  );
                  setMinRangeValue(value);
                  setActiveBar("min");
                  onPriceFilter(value, maxRangeValue); // ✅
                }}
                onMouseDown={() => setActiveBar("min")}
                onTouchStart={() => setActiveBar("min")}
                onFocus={() => setActiveBar("min")}
                onMouseEnter={() => setActiveBar("min")}
              />
              <input
                id="max"
                type="range"
                min="0"
                step="1"
                max="2000"
                value={maxRangeValue}
                className={`absolute w-full h-full bg-transparent appearance-none cursor-pointer pointer-events-none accent-blue-300 focus:outline-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto ${activeBar === "max" ? "z-30" : "z-20"}`}
                onChange={(e) => {
                  const value = Math.max(
                    Number(e.target.value),
                    minRangeValue + 5,
                  );
                  setMaxRangeValue(value);
                  setActiveBar("max");
                  onPriceFilter(minRangeValue, value); // ✅
                }}
                onFocus={() => setActiveBar("max")}
                onMouseDown={() => setActiveBar("max")}
                onTouchStart={() => setActiveBar("max")}
                onMouseEnter={() => setActiveBar("max")}
              />
            </div>

            <button
              type="submit"
              onClick={() => onPriceFilter(minRangeValue, maxRangeValue)}
              className="bg-primary text-light-text w-full h-11 rounded-lg hover:bg-hover hover:cursor-pointer"
            >
              Filter
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}

export default Filter;
