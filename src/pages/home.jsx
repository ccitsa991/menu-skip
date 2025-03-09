import React, { useState, useEffect } from "react";
import BannerCard from "../components/home/banner";
import CategoryCarousel from "../components/home/categories";
import FoodList from "../components/home/food-list";
import Footer from "../components/home/footer";
import { useCategories, useMerchant, useItems } from "../services/queries";
import Spinner from "../components/shared/spinner";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t, i18n } = useTranslation(); // Use translation hook
  const { merchantId } = useParams();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [language, setLanguage] = useState(localStorage.getItem("locale") || "en");

  // Fetch merchant data
  const {
    loading: merchantLoading,
    error: merchantError,
    merchant,
  } = useMerchant(merchantId);
  const [branchId, setBranchId] = useState(null);

  // Update branchId when merchant data is available
  useEffect(() => {
    if (merchant && merchant.branches.length > 0) {
      setBranchId(merchant.branches[0].id);
    }
  }, [merchant]);

  // Fetch categories based on selected branch
  const {
    loading: categoriesLoading,
    error: categoriesError,
    categories,
  } = useCategories(branchId);
  const [categoryId, setCategoryId] = useState(null);

  // Update categoryId when categories data is available
  useEffect(() => {
    if (categories && categories.length > 0) {
      setCategoryId(categories[0].id);
    }
  }, [categories]);

  // Handle Theme Changes
  useEffect(() => {
    document.querySelector("body").classList = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Handle Language Changes
  useEffect(() => {
    i18n.changeLanguage(language);
    document.querySelector("html").dir = i18n.dir();
    document.querySelector("html").lang = language;
    localStorage.setItem("locale", language);
  }, [language, i18n]);

  // Fetch items based on merchantId, categoryId, and branchId
  const {
    loading: itemsLoading,
    error: itemsError,
    items,
  } = useItems(merchantId, categoryId, branchId);

  // Handle full-page loading state
  if (merchantLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  // Handle errors
  if (merchantError)
    return (
      <p className="text-red-500">
        {t("home.errors.merchant")} {merchantError.message}
      </p>
    );
  if (categoriesError)
    return (
      <p className="text-red-500">
        {t("home.errors.categories")} {categoriesError.message}
      </p>
    );
  if (itemsError)
    return (
      <p className="text-red-500">
        {t("home.errors.items")} {itemsError.message}
      </p>
    );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner Section */}
      <BannerCard
        theme={theme}
        setTheme={setTheme}
        merchant={merchant}
        branchId={branchId}
        setBranchId={setBranchId}
        setLanguage={setLanguage}
        language={language}
      />

      {/* Categories Section */}
      <div className="px-6 z-10 pt-2 pb-3 sticky top-0 bg-white">
        <CategoryCarousel
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          categories={categories}
        />
      </div>

      {/* Items List Section */}
      <FoodList loading={itemsLoading} items={items} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
