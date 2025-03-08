import React, { useState, useEffect } from "react";
import BannerCard from "../components/home/banner";
import CategoryCarousel from "../components/home/categories";
import FoodList from "../components/home/food-list";
import Footer from "../components/home/footer";
import { useCategories, useMerchant, useItems } from "../services/queries";
import Spinner from '../components/shared/spinner';
import { useParams } from "react-router-dom";

const Home = () => {
  const { merchantId } = useParams()

  // Fetch merchant data
  const { loading: merchantLoading, error: merchantError, merchant } = useMerchant(merchantId);
  const [branchId, setBranchId] = useState(null);

  // Update branchId when merchant data is available
  useEffect(() => {
    if (merchant && merchant.branches.length > 0) {
      setBranchId(merchant.branches[0].id);
    }
  }, [merchant]);

  // Fetch categories based on selected branch
  const { loading: categoriesLoading, error: categoriesError, categories } = useCategories(branchId);
  const [categoryId, setCategoryId] = useState(null);

  // Update categoryId when categories data is available
  useEffect(() => {
    if (categories && categories.length > 0) {
      setCategoryId(categories[0].id);
    }
  }, [categories]);

  // Fetch items based on merchantId, categoryId, and branchId
  const { loading: itemsLoading, error: itemsError, items } = useItems(merchantId, categoryId, branchId);

  // Handle full-page loading state
  if (merchantLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />  
      </div>
    );
  }

  // Handle errors
  if (merchantError) return <p className="text-red-500">Error fetching merchant data: {merchantError.message}</p>;
  if (categoriesError) return <p className="text-red-500">Error fetching categories: {categoriesError.message}</p>;
  if (itemsError) return <p className="text-red-500">Error fetching items: {itemsError.message}</p>;
  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner Section */}
      <BannerCard merchant={merchant} branchId={branchId} setBranchId={setBranchId} />

      {/* Categories Section */}
      <div className="px-6 pt-2 pb-3 sticky top-0 bg-white">
        <CategoryCarousel categoryId={categoryId} setCategoryId={setCategoryId} categories={categories} />
      </div>

      {/* Items List Section */}
      <FoodList loading={itemsLoading} items={items} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
