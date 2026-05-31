import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

// Dropdown bileşeni (ref'siz hali)
export const CustomDropdown = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      // Eğer tıklanan yer, "dropdown-container" class'ına sahip bir elementin içinde değilse
      if (!e.target.closest(".dropdown-container")) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    
   
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  return (
   
    <div className="relative w-24 dropdown-container"> 
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-12 bg-gray-300 rounded-lg flex items-center justify-between px-3 text-sm font-medium"
      >
       
        {value || placeholder}
         <ChevronDown/>
      </button>

      {isOpen && (
        <ul className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};