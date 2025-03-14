import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslation } from "react-i18next";
import "swiper/css"; // Import Swiper styles
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";

const CategoryCarousel = ({ categories, setCategoryId, categoryId }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl"; // Detect RTL mode

  return (
    <div style={{ direction: i18n.dir() }} className="w-full mt-4">
      <Swiper
        slidesPerView="auto"
        spaceBetween={10}
        freeMode={true}
        modules={[FreeMode]}
        rtl={isRTL} // Enable RTL mode dynamically
      >
        {categories?.map((category) => (
          <SwiperSlide key={category?.id} style={{ width: "auto" }}>
            <button
              onClick={() => setCategoryId(category?.id)}
              className={`px-3 py-2 font-semibold rounded-[12px] transition-all text-[12px] flex items-center justify-center whitespace-nowrap border  text-gray-800
                ${
                  categoryId === category?.id
                    ? "bg-primary text-light"
                    : "border-[#DADADA] text-text-color"
                }`}
            >
              {category?.name}
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategoryCarousel;
