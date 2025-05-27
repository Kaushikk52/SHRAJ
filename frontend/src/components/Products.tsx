import { products } from "@/constants/constant";
import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const Products = () => {
  return (
    <Swiper
      spaceBetween={20}
      loop={true}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      modules={[Autoplay]}
      breakpoints={{
        0: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
      }}
    >
      {products.slice(0, 4).map((product) => (
        <SwiperSlide key={product.id}>
          <ProductCard
            id={product.id}
            name={product.name}
            image={product.image}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Products;
