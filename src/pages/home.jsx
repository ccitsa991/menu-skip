import React, { useState, useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom"; // Import useSearchParams
import BannerCard from "../components/home/banner";
import CategoryCarousel from "../components/home/categories";
import FoodList from "../components/home/food-list";
import Footer from "../components/home/footer";
import { useCategories, useMerchant, useItems } from "../services/queries";
import Spinner from "../components/shared/spinner";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t, i18n } = useTranslation();
  const { merchantId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams(); // URL Query params

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [language, setLanguage] = useState(localStorage.getItem("locale") || "ar");

  // Fetch merchant data
  const {
    loading: merchantLoading,
    error: merchantError,
    merchant,
  } = useMerchant(merchantId);
  const [branchId, setBranchId] = useState(searchParams.get("branchId") || null);

  // Sync branchId with URL on merchant load
  useEffect(() => {
    if (merchant && merchant.branches.length > 0) {
      const urlBranchId = searchParams.get("branchId");
      const defaultBranchId = merchant.branches[0].id;

      setBranchId(urlBranchId || defaultBranchId);

      if (!urlBranchId) {
        setSearchParams({ branchId: defaultBranchId }, { replace: true });
      }
    }
  }, [merchant]);

  // Update URL when branchId changes
  useEffect(() => {
    if (branchId) {
      setSearchParams({ branchId }, { replace: true });
    }
  }, [branchId]);

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

  // Fetch items based on merchantId, categoryId, and branchId
  const {
    loading: itemsLoading,
    error: itemsError,
    items,
  } = useItems(merchantId, categoryId, branchId);

  useEffect(() => {
    if (merchantId) {
      document.title = `${merchantId} Menu - SKIP APP`;
    }
  }, [merchantId]);

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
    <div className="flex bg-white flex-col min-h-screen">
      {/* Banner Section */}
      <BannerCard
        theme={theme}
        setTheme={setTheme}
        merchant={merchant}
        branchId={branchId}
        setBranchId={setBranchId}
        setLanguage={setLanguage}
        language={language}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        categories={categories}
      />

      {/* Categories Section */}
  

      {/* Items List Section */}
      <FoodList theme={theme} loading={itemsLoading} items={items} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
