import { useState } from "react";
import { FaFireAlt } from "react-icons/fa";
import { PiCurrencyKztBold } from "react-icons/pi";

const FoodItem = ({ item, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div>
      <div
        className="flex items-center justify-between mt-5 p-4 cursor-pointer"
        onClick={() => onClick(item)}
      >
        {/* Left Section - Text */}
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <div className="flex items-center gap-4 mt-2">
            <span className="flex items-center text-primary text-lg font-semibold">
              <img
                src={"/images/currency.svg"}
                alt="currency"
                className="me-1"
              />
              {item.price}
            </span>
            <span className="flex items-center text-black font-semibold text-xs">
              <FaFireAlt className="me-1 text-black" />
              {item.calories}
            </span>
          </div>
        </div>

        {/* Right Section - Image with Shimmer Effect */}
        <div className="w-20 h-20 rounded-lg overflow-hidden relative">
          {/* Shimmer Loader (Visible until image is loaded) */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
          )}

          {/* Actual Image */}
          <img
            src={item?.itemImageUrl}
            alt={item?.name}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)} // When image loads, hide shimmer
          />
        </div>
      </div>

      {/* Separator Line */}
      <hr className="my-4 border-gray-200" />
    </div>
  );
};

export default FoodItem;
