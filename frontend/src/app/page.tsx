"use client";

import HeroComponent from "@/components/HeroComponent";
import Products from "@/components/Products";
import { featuresData } from "@/constants/constant";
import { useRef } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Autoplay } from "swiper/modules";
import ImageSlider from "@/components/ImageSlider";
import Link from "next/link";

export default function Home() {
  const productsRef = useRef<HTMLDivElement>(null);
  return (
    <div className="bg-gray-100">
      <HeroComponent prodRef={productsRef} />
      <div className="w-full py-10">
        <ImageSlider />
      </div>
      <div className="flex flex-col gap-10">
        <div className="bg-[#2C318F]">
          <div className="flex flex-col gap-10 max-w-7xl mx-auto text-white py-20 px-4 md:px-0">
            <div className="text-center flex flex-col gap-2">
              <h1 className="text-lg text-slate-300">About Us</h1>
              <h1 className="text-2xl md:text-5xl font-bold text-[#d3686d]">
                CRAFTING EXCELLENCE, SHAPING TOMORROW
              </h1>
            </div>
            <p className="text-slate-300 md:text-center text-start text-balance">
              Established In 2016, Shraj Industries Private Limited Is A Leading
              Manufacturer Of High-Quality Autoclaves & Sterilizers, Including
              Vertical, Horizontal, Cylindrical, And Rectangular Autoclaves,
              Along With Mortuary Freezers, Industrial Ovens, And Industrial
              Batch Ovens. At Shraj Industries, We Are Committed To Delivering
              Exceptional Quality Products That Meet And Exceed Customer
              Expectations. Our Operations Are Driven By Integrity,
              Transparency, And Ethical Business Practices, Ensuring Long-Term
              And Trusted Relationships With Our Clients Worldwide. Our
              Continued Success And Growth Are Made Possible Through The
              Visionary Leadership Of Mr. Shravan Chauhan, Whose Guidance Has
              Been Instrumental In Driving Our Innovation, Excellence, And
              Market Expansion.
            </p>
            <div>
              {/* Desktop view (md and up) */}
              <div className="hidden md:flex flex-col md:flex-row items-start md:items-center justify-between gap-5 mx-auto max-w-5xl">
                {featuresData.map((data, index) => (
                  <div
                    key={data.tag}
                    className={`flex flex-col gap-2 ${
                      index !== featuresData.length - 1 &&
                      "border-none border-r-gray-600 md:border-r items-start"
                    }`}
                  >
                    <div className="flex items-start gap-5">
                      <data.icon
                        size={50}
                        className="text-[#d3686d]"
                        strokeWidth={index == 0 || index === 3 ? 1 : 0}
                      />
                      <h1 className="text-2xl text-slate-50 font-semibold w-[60%]">
                        {data.tag}
                      </h1>
                    </div>
                    <p className="font-nunito text-md text-start text-slate-100 text-balance">
                      {data.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Mobile view only (below md) */}
              <div className="block md:hidden px-4">
                <Swiper
                  spaceBetween={20}
                  slidesPerView={1}
                  loop={true}
                  // pagination={{ clickable: true }}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  modules={[Autoplay]}
                >
                  {featuresData.map((data, index) => (
                    <SwiperSlide key={data.tag}>
                      <div className="flex flex-col gap-2 items-center justify-center w-[80%] mx-auto">
                        <div className="flex items-center gap-5">
                          <data.icon
                            size={50}
                            className="text-[#d3686d]"
                            strokeWidth={index == 0 || index === 3 ? 1 : 0}
                          />
                          <h1 className="text-2xl text-slate-50 font-semibold w-[60%]">
                            {data.tag}
                          </h1>
                        </div>
                        <p className="font-nunito text-md text-slate-100 text-balance">
                          {data.desc}
                        </p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-7xl flex flex-col mx-auto mb-10">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-4xl font-semibold">
              Some Of Our Products
            </h1>
            <Link href={"/all-products"}>
              <button className="bg-[#2E2F91] hover:bg-blue-600 transition duration-300 py-2 px-4 rounded-full flex items-center gap-2 text-md text-white cursor-pointer font-semibold">
                view all
                <span>
                  <FaArrowRightLong size={14} />
                </span>
              </button>
            </Link>
          </div>
          <div ref={productsRef}>
            <Products />
          </div>
        </div>
      </div>
    </div>
  );
}
