import { useState } from "react";
import { FaFireAlt } from "react-icons/fa";
import { PiCurrencyKztBold } from "react-icons/pi";

const FoodItem = ({ item, onClick, theme }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div>
      <div
        className="flex items-center justify-between py-2  cursor-pointer"
        onClick={() => onClick(item)}
      >
        {/* Left Section - Text */}
        <div className="flex flex-col">
          <h3 className="font-semibold text-text-color">{item.name}</h3>
          <h3 className="text-gray-500">{item.description}</h3>
          <div className="flex items-center gap-4 mt-2">
            <span className="flex items-center text-primary text-lg font-semibold">
              <img
                src={
                  theme === "dark"
                    ? "/images/currency-dark.svg"
                    : "/images/currency.png"
                }
                alt="currency"
                className="me-1 object-cover w-3 h-3"
              />

              {item.price}
            </span>
            <span className="flex items-center text-text-color font-semibold text-xs">
              <FaFireAlt className="me-1 text-text-color" />
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
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </div>

      {/* Separator Line */}
      <hr className="my-1"style={{
        border:'.5px solid rgba(222, 231, 238, 0.3)'
      }} />

    </div>
  );
};

export default FoodItem;
