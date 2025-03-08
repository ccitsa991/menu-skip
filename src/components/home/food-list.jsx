import { useState } from "react";
import FoodItem from "./food-item";
import FoodModal from "./food-modal";
import ShimmerItem from "./food-item-shimmer";

const FoodList = ({ items, loading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Open modal with selected item
  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  return (
    <div className="bg-white px-6">
      {loading
        ? // Render 4 shimmer placeholders when loading
         [1,2,3,4].map((_, index) => <ShimmerItem key={index} />)
        :  
          items?.map((item) => (
            <FoodItem key={item.id} item={item} onClick={handleOpenModal} />
          ))}

      {/* Modal Component */}
      <FoodModal isOpen={isOpen} item={selectedItem} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default FoodList;
