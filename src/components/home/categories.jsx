import Slider from "react-slick";

const CategoryCarousel = ({ categories, setCategoryId , categoryId}) => {

  // Slick Carousel Settings
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    arrows: false,
    variableWidth: true, // Allow items to have dynamic width
  };
  return (
    <div className="w-full mt-4">
      <Slider {...settings}>
        {categories?.map((category) => (
          <div key={category?.id} className="px-2">
            <button
              onClick={() => setCategoryId(category?.id)}
              className={`px-4 py-2 rounded-full transition-all flex items-center justify-center whitespace-nowrap border border-gray-300 text-gray-800
                ${
                  categoryId === category?.id
                    ? "bg-primary text-white"
                    : "border-gray-300 text-gray-800"
                }`}
            >
              {category?.name}
            </button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CategoryCarousel;
