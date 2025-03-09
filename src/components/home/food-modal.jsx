import { FaTimes } from "react-icons/fa";
import { PiCurrencyKztBold } from "react-icons/pi";
import { FaFireAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

const FoodModal = ({ isOpen, item, onClose }) => {
  const [showModal, setShowModal] = useState(false);

  // Smooth Snooze Effect
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowModal(true), 100); // Delay before sliding up
    } else {
      setShowModal(false);
    }
  }, [isOpen]);

  if (!item) return null;

  return (
    <>
      {/* Modal Overlay */}
      <div
        className={`fixed z-20 inset-0 bg-black transition-opacity duration-500 ${
          isOpen ? "opacity-50 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Bottom Sheet Modal */}
      <div
        className={`fixed z-20 bottom-0 left-0 w-full z-50 bg-white rounded-t-3xl p-6 shadow-lg transform transition-transform duration-500 ${
          showModal ? "translate-y-0" : "translate-y-full"
        }`}
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside modal
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-dark">{item.name}</h2>
          <button onClick={onClose}>
            <FaTimes className="text-primary text-xl" />
          </button>
        </div>

        {/* Image */}
        <div className="w-full h-40 rounded-lg overflow-hidden mt-4">
          <img
            src={item?.itemImageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="mt-4 max-h-72 overflow-y-auto">
          {item?.addon_groups?.map((addon) => (
            <div key={addon?.id}>
              {/* Addon Group Name */}
              <p className="text-lg text-black rounded-md p-3 bg-[#E9EAF1]">
                {addon?.name}
              </p>

              {/* Choices inside Addon Group */}
              {addon?.choices?.map((choice) => (
                <div key={choice?.id} className="mt-2">
                  <p className="text-black">{choice?.name}</p>
                  <span className="text-[#8890A0]">({choice?.price})</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Close Button */}
        <button
          className="w-full mt-6 py-3 bg-primary text-light font-semibold rounded-lg"
          onClick={onClose}
        >
          Close
        </button>

        {/* Drag Handle */}
        <div className="w-12 h-1 bg-gray-400 rounded-full mx-auto mt-2" />
      </div>
    </>
  );
};

export default FoodModal;
