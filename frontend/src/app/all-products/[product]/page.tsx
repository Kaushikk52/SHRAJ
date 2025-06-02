"use client";

import { ProductImageZoom } from "@/components/ProductImageZoom";
import { OvenOtherFeaturesType, products } from "@/constants/constant";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import DescriptionComponent from "@/components/products-helper/DescriptionComponent";
import OtherFeaturesComponent from "@/components/products-helper/OtherFeaturesComponent";
import OptionsComponent from "@/components/products-helper/OptionsComponent";

type productDetailType = {
  id: number;
  name: string;
  brand: string;
  type: string;
  image: string;
  images: string[];
  description: string;
  overallDescription: string;
  mainFeatures: string[];
  otherFeatures: OvenOtherFeaturesType;
  more: {
    img: string[];
  };
};

const options = [
  "Custom shelves, carts + trucks made to accompany any style oven",
  "Exhaust vent with damper",
  "Interior door latch",
  "Outdoor use package",
  "Chart recorder",
  "Door switch",
  "Adjustable timer",
  "Ethernet or serial bus communication",
  "Profile temperature control with ramp and hold capability",
  "Industrially hardened SCADA (supervisory control and data acquisition) system capable of controlling 20 ovens",
  "Integrated PLC controls with touch screen",
  "Class 'A' oven controls with powered exhaust systems are readily available upon request",
];

export default function Product() {
  const params = useParams();
  const productId = Number(params.product);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [productDetail, setProducDetail] = useState<productDetailType | null>(
    null
  );

  const [activeTab, setActiveTab] = useState<
    "description" | "features" | "options"
  >("description");

  useEffect(() => {
    const data = products.find((product) => product.id === productId);
    setProducDetail(data || null);
  }, [productId]);

  const otherProducts = products
    .filter((item) => item.id !== productId)
    .slice(0, 8);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] max-w-7xl mx-auto gap-20 items-start justify-center mt-20">
        <div>
          <ProductImageZoom images={productDetail?.images || [""]} />
        </div>
        <div className="flex flex-col items-start gap-10 px-4 md:px-0">
          <h1 className="text-4xl font-nunito font-semibold">
            {productDetail?.name}
          </h1>
          <div className="flex flex-col gap-10 w-full">
            <div className="border-b pb-2 flex items-center justify-between w-full">
              <h1
                onClick={() => setActiveTab("description")}
                className={`cursor-pointer ${
                  activeTab === "description" ? "text-[#0f0ff0]" : "text-black"
                }`}
              >
                Description
              </h1>
              <h1
                onClick={() => setActiveTab("features")}
                className={`cursor-pointer ${
                  activeTab === "features" ? "text-[#0f0ff0]" : "text-black"
                }`}
              >
                Features
              </h1>
              <h1
                onClick={() => setActiveTab("options")}
                className={`cursor-pointer ${
                  activeTab === "options" ? "text-[#0f0ff0]" : "text-black"
                }`}
              >
                More
              </h1>
            </div>

            {activeTab === "description" && (
              <DescriptionComponent
                overallDescription={productDetail?.overallDescription || ""}
                mainFeatures={productDetail?.mainFeatures || []}
              />
            )}
            {activeTab === "features" && (
              <OtherFeaturesComponent
                otherFeatures={productDetail?.otherFeatures || {}}
              />
            )}
            {activeTab === "options" &&
              (productDetail?.type === "Industrial Ovens" ? (
                <OptionsComponent options={options} />
              ) : (
                <OptionsComponent img={productDetail?.more?.img || []} />
              ))}
          </div>
        </div>
      </div>

      {/* Other Products Section */}
      <section className="bg-gray-100 mt-20 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-start justify-between mb-8">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-black mb-2 leading-tight">
                other products
                <br />
                you might like
              </h2>
              <p className="text-sm text-gray-600 mt-6 max-w-sm">
                Discover complementary items - explore products you might like.
              </p>
            </div>

            <div className="flex items-center gap-2 ml-8">
              <button
                onClick={scrollLeft}
                className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft size={18} className="text-gray-600" />
              </button>
              <button
                onClick={scrollRight}
                className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <ChevronRight size={18} className="text-gray-600" />
              </button>
            </div>
          </div>

          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-4"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {otherProducts.map((item) => (
              <Link href={`/all-products/${item.id}`} key={item.id}>
                <div className="bg-white rounded-2xl p-6 hover:shadow-lg transition-shadow flex-shrink-0 w-72">
                  <div className="w-full h-48 relative mb-6 bg-gray-50 rounded-xl">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                      {item.brand}
                    </div>
                    <div className="text-sm font-semibold text-gray-900 leading-tight">
                      {item.name}
                    </div>
                    <div className="text-xs text-gray-600">{item.type}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}
