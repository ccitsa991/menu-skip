import { FaAngleLeft } from "react-icons/fa6";
import SelectBranch from "./select-branch";
import { FaDirections } from "react-icons/fa";
import { FaMoon, FaSun, FaGlobe } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useCallback } from "react";

const BannerCard = ({
  merchant,
  branchId,
  setBranchId,
  theme,
  setTheme,
  setLanguage,
  language,
}) => {
  const { i18n } = useTranslation();

  const lat = merchant?.branches?.find((el) => el.id === branchId)?.location
    ?.latitude;
  const lng = merchant?.branches?.find((el) => el.id === branchId)?.location
    ?.longitude;

  const GetDirections = () => {
    if (lat && lng) {
      const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
      window.open(googleMapsUrl, "_blank"); 
    } else {
      alert("Location not available");
    }
  };

  const toggleLanguage = useCallback(
    (lng) => {
      i18n.changeLanguage(lng);
      document.querySelector("html").dir = i18n.dir();
      document.querySelector("html").lang = lng;
      localStorage.setItem("locale", lng);
    },
    [i18n]
  );
  return (
    <div className="flex flex-col bg-white">
      {/* Image Section */}
      <div className="relative h-48 w-full">
        {/* Store Cover Image */}
        <img
          src={merchant?.storeCoverUrl}
          alt={merchant?.store_name}
          className="w-full h-full object-cover rounded-b-3xl"
        />

        {/* Back Button */}
        <button
          className={`absolute top-4 w-fit  p-2 rounded-full shadow-md bg-white ${
            i18n.dir() === "rtl" ? "right-4" : "left-4"
          }`}
        >
          <FaAngleLeft className="text-lg text-text-color" />
        </button>

        {/* Floating Logo */}
        <img
          src={merchant?.storeLogoUrl}
          alt={merchant?.store_name}
          className={`absolute bottom-[-50px]  h-24 w-24 bg-white rounded-3xl shadow-xl ${
            i18n.dir() === "rtl" ? "right-4" : "left-4"
          }`}
        />

        {/* Language & Dark Mode Toggle Buttons */}
        <div
          className={`absolute top-4  flex gap-2 ${
            i18n.dir() === "rtl" ? "left-4" : "right-4"
          }`}
        >
          {/* Language Toggle Button */}
          {i18n.language === "en" ? (
            <button
              onClick={() => toggleLanguage("ar")}
              className="p-2 rounded-full bg-white shadow-md"
            >
              <FaGlobe className="text-lg text-text-color" />
            </button>
          ) : (
            <button
              onClick={() => toggleLanguage("en")}
              className="p-2 rounded-full bg-white shadow-md"
            >
              <FaGlobe className="text-lg text-text-color" />
            </button>
          )}

          {/* Dark Mode Toggle Button */}
          {theme === "dark" && (
            <button
              onClick={() => {
                document.querySelector("body").classList = "light";
                setTheme("light");
                localStorage.setItem("theme", "light");
              }}
              className="p-2 rounded-full bg-white shadow-md"
            >
              <FaSun className="text-lg text-dark" />
            </button>
          )}

          {theme === "light" && (
            <button
              onClick={() => {
                document.querySelector("body").classList = "dark";
                setTheme("dark");
                localStorage.setItem("theme", "dark");
              }}
              className="p-2 rounded-full bg-white shadow-md"
            >
              <FaMoon className="text-lg text-dark" />
            </button>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 mt-12 flex justify-between items-center">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-text-color">
          {merchant?.store_name}
        </h2>

        {/* Select Branch Button */}

        <SelectBranch
          branchId={branchId}
          setBranchId={setBranchId}
          branches={merchant?.branches}
        />
      </div>

      {/* Get Direction */}
      <div className="flex items-end justify-end">
        <div
          className="flex items-center gap-4 px-6 pt-4"
          onClick={GetDirections}
        >
          {/* Text Section */}
          <div className="flex flex-col">
            <p className=" font-bold text-text-color underline">
              Get Directions
            </p>
          </div>

          {/* Icon Section */}
          <div className="flex items-center justify-center w-8 h-8 bg-black rounded-lg">
            <FaDirections className="text-text-color text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerCard;
