import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

const SharedModal = ({ isOpen, onClose, title, children }) => {
  const [showModal, setShowModal] = useState(false);

  // Smooth Snooze Effect
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowModal(true), 40);
    } else {
      setShowModal(false);
    }
  }, [isOpen]);

  return (
    <>
      {/* Modal Overlay */}
      <div
        className={`fixed z-20 inset-0 bg-black transition-opacity duration-500  ${
          isOpen ? "opacity-50 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Bottom Sheet Modal */}
      <div
        className={`z-20 fixed bottom-0 left-0 w-full bg-white rounded-t-3xl p-6 shadow-lg transform transition-transform duration-500 ${
          showModal ? "translate-y-0" : "translate-y-full"
        }`}
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside modal
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center">
          <div className=""></div>
          <h2 className="text-lg font-semibold py-3 text-dark">{title}</h2>
          <button onClick={onClose}>
            <FaTimes className="text-primary text-xl" />
          </button>
        </div>

        <hr className="my-2 border-gray-300" />

        {/* Modal Content */}
        <div className="">
            {children}
        </div>
        {/* <p className="text-[#8890A0] text-center pt-4 px-4">
        Children aged 4-13 need an average of (1200-1500) calories per day, and those over 13 years old need an average of 2000 calories per day. Individual calorie needs differ from one person to another.
        </p> */}

        {/* Drag Handle */}
        <div className="w-12 h-1 bg-gray-400 rounded-full mx-auto mt-4" />
      </div>
    </>
  );
};

export default SharedModal;
