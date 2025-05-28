"use client";

import ImageSlider from "@/components/ImageSlider";
import { featuresData } from "@/constants/constant";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Autoplay } from "swiper/modules";
import Image from "next/image";

export default function About() {
  return (
    <div>
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
            Vertical, Horizontal, Cylindrical, And Rectangular Autoclaves, Along
            With Mortuary Freezers, Industrial Ovens, And Industrial Batch
            Ovens. At Shraj Industries, We Are Committed To Delivering
            Exceptional Quality Products That Meet And Exceed Customer
            Expectations. Our Operations Are Driven By Integrity, Transparency,
            And Ethical Business Practices, Ensuring Long-Term And Trusted
            Relationships With Our Clients Worldwide. Our Continued Success And
            Growth Are Made Possible Through The Visionary Leadership Of Mr.
            Shravan Chauhan, Whose Guidance Has Been Instrumental In Driving Our
            Innovation, Excellence, And Market Expansion.
          </p>
          <div>
            {/* Desktop view (md and up) */}
            <div className="hidden lg:flex flex-col md:flex-row items-start md:items-center justify-between gap-5 mx-auto max-w-5xl">
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
            <div className="block lg:hidden px-4">
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
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-0 space-y-16">
          {/* Reusable Card */}
          {[
            {
              title: "Quality Assurance",
              image: "/about-img-1.jpg",
              content: (
                <>
                  <span className="font-semibold text-gray-700">
                    Shraj Industries Private Limited
                  </span>{" "}
                  keep a strict vigil on each manufacturing process. Our product
                  passes through regular quality checks, which ensures its
                  performance and efficiency. Right from the procurement of raw
                  material to the final finished product, our quality
                  controllers ensures that only a defect free range reaches to
                  the final destination.
                </>
              ),
            },
            {
              title: "Our Expertise:",
              image: "/about-img-3.jpg",
              content: (
                <ul className="space-y-2 mt-4">
                  {[
                    "With 7 years of experience in oven manufacturing",
                    "high-quality products",
                    "dedicated customer support",
                    "Installation",
                  ].map((tool, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                      <span className="text-gray-700">{tool}</span>
                    </li>
                  ))}
                </ul>
              ),
            },
            {
              title: "Why Us ?",
              image: "/about-img-2.jpeg",
              content: (
                <>
                  <p className="text-gray-600 mb-4 font-medium">
                    Some of the factors, which gives us a competitive edge over
                    other market players are :
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Premium quality products",
                      "Capacious warehouse",
                      "Wide distribution net worth",
                      "Competitive prices.",
                      "Prompt Service",
                    ].map((point, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </>
              ),
            },
          ].map((card, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden"
            >
              {/* Image */}
              <div className="md:w-1/2 relative">
                <Image
                  src={card.image}
                  alt={`about-img-${index}`}
                  layout="responsive"
                  width={600}
                  height={400}
                  className="object-cover h-full"
                />
              </div>

              {/* Text Box */}
              <div className="mstatic top-4 md:top-auto right-4 md:right-auto md:w-1/2 bg-white rounded-lg p-6 shadow-md md:shadow-none md:rounded-none md:p-8 md:ml-[-40px] z-10">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {card.title}
                </h3>
                <div className="text-gray-600 leading-relaxed">
                  {card.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ImageSlider />
    </div>
  );
}
