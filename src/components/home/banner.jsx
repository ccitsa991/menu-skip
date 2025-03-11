import { FaAngleLeft } from "react-icons/fa6";
import SelectBranch from "./select-branch";
import { FaDirections } from "react-icons/fa";
import { FaMoon, FaSun, FaGlobe } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useCallback } from "react";
import CategoryCarousel from "./categories";

const BannerCard = ({
  merchant,
  branchId,
  setBranchId,
  theme,
  setTheme,
  setCategoryId,
  categories,
  categoryId,
}) => {
  const { t, i18n } = useTranslation(); // Use translation

  const lat = merchant?.branches?.find((el) => el.id === branchId)?.location
    ?.latitude;
  const lng = merchant?.branches?.find((el) => el.id === branchId)?.location
    ?.longitude;

  const GetDirections = () => {
    if (lat && lng) {
      const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
      window.open(googleMapsUrl, "_blank");
    } else {
      alert(t("home.alerts.locationNotAvailable")); // Translated alert
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
    <div
    className="flex flex-col bg-white rounded-b-2xl overflow-hidden"
    // style={{
    //   boxShadow: "0px -5px 40px 0px rgba(180, 183, 209, 0.2)", // Custom bottom shadow
    // }}
  >
  
      {" "}
      {/* Image Section */}
      <div className="relative h-28 w-full">
        {/* Store Cover Image */}
        <img
          src={merchant?.storeCoverUrl}
          alt={merchant?.store_name}
          className="w-full h-full object-cover"
        />

        {/* Back Button */}
        {/* <button
          className={`absolute top-4 w-fit p-2 rounded-full shadow-md bg-white ${
            i18n.dir() === "rtl" ? "right-4" : "left-4"
          }`}
        >
          <FaAngleLeft className="text-lg text-text-color" />
        </button> */}

        {/* Floating Logo */}
        <img
          src={merchant?.storeLogoUrl}
          alt={merchant?.store_name}
          className={`absolute bottom-[-50px] h-18 w-18 bg-white rounded-xl shadow-xl ${
            i18n.dir() === "rtl" ? "right-4" : "left-4"
          }`}
        />

        {/* Language & Dark Mode Toggle Buttons */}
        <div
          className={`absolute top-4 flex gap-2 ${
            i18n.dir() === "rtl" ? "left-4" : "right-4"
          }`}
        >
          {/* Language Toggle Button */}
          <button
            onClick={() => toggleLanguage(i18n.language === "en" ? "ar" : "en")}
            className="p-2 rounded-md flex justify-center items-center w-8 h-8 bg-white shadow-md"
          >
            {i18n.language === "en" ? (
              <span className="text-sm text-text-color">Ar</span>
            ) : (
              <span className="text-sm text-text-color">En</span>
            )}
          </button>

          {/* Dark Mode Toggle Button */}
          <button
            onClick={() => {
              const newTheme = theme === "dark" ? "light" : "dark";
              document.querySelector("body").classList = newTheme;
              setTheme(newTheme);
              localStorage.setItem("theme", newTheme);
            }}
            className="p-2 h-8 w-8 flex items-center justify-center rounded-md bg-white shadow-md"
          >
            {theme === "dark" ? (
              <FaSun className="text-sm text-dark" />
            ) : (
              <FaMoon className="text-sm text-dark" />
            )}
          </button>
        </div>
      </div>
      {/* Content Section */}
      <div className="px-6 mt-16 flex justify-between items-center">
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
      {/* <div className="flex items-end justify-end">
        <div
          className="flex items-center gap-4 px-6 pt-4"
          onClick={GetDirections}
        >
          <div className="flex flex-col">
            <p className="font-bold text-text-color underline">
              {t("home.buttons.getDirections")}
            </p>
          </div>

          <div className="flex items-center justify-center w-8 h-8 bg-dark rounded-md">
            <FaDirections className="text-white text-xl" />
          </div>
        </div>
      </div> */}
      <div className="px-6 z-10 pt-2 pb-3 sticky top-0 bg-white">
        <CategoryCarousel
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          categories={categories}
        />
      </div>
    </div>
  );
};

export default BannerCard;
