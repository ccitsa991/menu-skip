import React from "react";

const ShimmerItem = () => {
  return (
    <div className="flex items-center justify-between mt-5 p-4 animate-pulse">
      {/* Left Section - Placeholder Text */}
      <div className="flex flex-col">
        <div className="h-4 w-32 bg-gray-300 rounded-md"></div>
        <div className="flex items-center gap-4 mt-2">
          <div className="h-4 w-16 bg-gray-300 rounded-md"></div>
          <div className="h-4 w-10 bg-gray-300 rounded-md"></div>
        </div>
      </div>

      {/* Right Section - Placeholder Image */}
      <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>
    </div>
  );
};

export default ShimmerItem;
