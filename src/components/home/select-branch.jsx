import { useState } from "react";
import { FaTimes, FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";

const SelectBranch = ({branches,
  setBranchId,
  branchId
}) => {
  const [isOpen, setIsOpen] = useState(false);


  const handleSelectBranch = (branch) => {
    setBranchId(branch);
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      {/* Select Button */}
      <button
        className="flex items-center gap-2 font-semibold px-7 py-3 bg-gray-200 text-gray-500 rounded-lg"
        onClick={() => setIsOpen(true)}
      >
        <HiOutlineLocationMarker className="text-primary text-1xl" />
        {branches?.find((el)=>el.id === branchId)?.name || "Select Branch"}
      </button>

      {/* Modal Overlay */}
      <div
        className={`fixed z-50 inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? "opacity-50 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Bottom Sheet Modal */}
      <div
        className={`fixed bottom-0 z-50 left-0 w-full bg-white rounded-t-3xl p-6 shadow-lg transform transition-transform duration-500 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        onClick={(e) => e.stopPropagation()}  
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b border-gray-200">
          <div className=""></div>
          <h2 className="text-lg text-center pb-4 text-text-color">Select Branch</h2>
          <button onClick={() => setIsOpen(false)}>
            <FaTimes className="text-primary text-xl mb-4" />
          </button>
        </div>

        {/* Branch List */}
        <div className="mt-4">
          {branches?.map((branch) => (
            <div
              key={branch?.id}
              className="flex justify-between items-center py-4 border-b border-gray-200 cursor-pointer"
              onClick={() => handleSelectBranch(branch?.id)}
            >
              <p className="text-lg text-text-color">{branch?.name}</p>
              {branchId === branch?.id ? (
                <FaCheckCircle className="text-primary text-xl" />
              ) : (
                <FaRegCircle className="text-gray-400 text-xl" />
              )}
            </div>
          ))}
        </div>

        {/* Done Button */}
        <button
          className="w-full mt-6 py-3 bg-primary text-light font-semibold rounded-lg"
          onClick={() => setIsOpen(false)}
        >
          Done
        </button>

        {/* Drag Handle */}
        <div className="w-12 h-1  bg-gray-400 rounded-full mx-auto mt-2" />
      </div>
    </div>
  );
};

export default SelectBranch;
