import { FaAngleLeft } from "react-icons/fa6";
import SelectBranch from "./select-branch";
import { FaDirections } from "react-icons/fa";

const BannerCard = ({ merchant, branchId, setBranchId }) => {
 const lat = merchant?.branches?.find((el)=>el.id === branchId)?.location?.latitude
 const lng = merchant?.branches?.find((el)=>el.id === branchId)?.location?.longitude
 
 
  const GetDirections = () => {
      if (lat && lng) {
        const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
        window.open(googleMapsUrl, "_blank"); // Opens in new tab
      } else {
        alert("Location not available");
      }
  }
  return (
    <div className="flex flex-col">
      {/* Image Section */}
      <div className="relative h-64 w-full">
        <img
          src={merchant?.storeCoverUrl}
          alt={merchant?.store_name}
          className="w-full h-full object-cover rounded-b-3xl"
        />

        {/* Back Button */}
        <button className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md">
          <FaAngleLeft className="text-lg" />
        </button>

        {/* Floating Logo */}
        <img
          src={merchant?.storeLogoUrl}
          alt={merchant?.store_name}
          className="mt-[-50px] left-4 h-24 w-24 bg-white  rounded-3xl  mx-6 shadow-xl"
        />
      </div>

      {/* Content Section */}
      <div className="px-6 mt-12 flex justify-between items-center">
        {/* Title */}
        <h2 className="text-2xl font-semibold">{merchant?.store_name}</h2>

        {/* Select Branch Button */}

        <SelectBranch
          branchId={branchId}
          setBranchId={setBranchId}
          branches={merchant?.branches}
        />
      </div>

      {/* Get Direction */}
      <div className="flex items-end justify-end">
        <div className="flex items-center gap-4 px-6 pt-4"  onClick={GetDirections}>
          {/* Text Section */}
          <div className="flex flex-col">
            <p className=" font-bold text-gray-800 underline">
              Get Directions
            </p>
          </div>

          {/* Icon Section */}
          <div className="flex items-center justify-center w-8 h-8 bg-gray-900 rounded-lg">
            <FaDirections className="text-white text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerCard;
