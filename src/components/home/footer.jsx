import { useState } from "react";
import { PiInfoLight } from "react-icons/pi";
import SharedModal from "../shared/modal";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg py-3 px-6 flex items-center justify-between">
        {/* Left Section - Daily Calories */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <PiInfoLight className="text-gray-600 text-lg" />
          <p className="text-gray-800 underline">Daily Calories</p>
        </div>

        {/* Right Section - Powered By */}
        <div className="flex items-center">
          <p className="text-gray-600">Powered by</p>
          <img src="/images/skip-logo.svg" alt="skip" className="ps-1" />
        </div>
      </div>

      {/* Modal Component */}

      <SharedModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={"Daily Calorie"}
      >
        {/* Modal Content */}
        <p className="text-[#8890A0] text-center pt-4 px-4">
          Children aged 4-13 need an average of (1200-1500) calories per day,
          and those over 13 years old need an average of 2000 calories per day.
          Individual calorie needs differ from one person to another.
        </p>
      </SharedModal>
    </>
  );
};

export default Footer;
