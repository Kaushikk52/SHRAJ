"use client";

import { ProductImageZoom } from "@/components/ProductImageZoom";
import { mainFeatres, products } from "@/constants/constant";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

type productDetailType = {
  id: number;
  name: string;
  brand: string;
  type: string;
  image: string;
  images: string[];
  description: string;
};

export default function Product() {
  const params = useParams();
  const productId = Number(params.product);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [productDetail, setProducDetail] = useState<productDetailType | null>(
    null
  );

  useEffect(() => {
    const data = products.find((product) => product.id === productId);
    setProducDetail(data || null);
  }, [productId]);

  const otherProducts = products
    .filter((item) => item.id !== productId)
    .slice(0, 5);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300, // Adjust scroll distance as needed
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300, // Adjust scroll distance as needed
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] max-w-7xl mx-auto gap-20 items-center justify-center mt-20">
        <div>
          <ProductImageZoom images={productDetail?.images || [""]} />
        </div>
        <div className="flex flex-col items-start gap-10 px-4 md:px-0">
          <h1 className="text-4xl font-nunito font-semibold">
            {productDetail?.name}
          </h1>
          <div className="flex flex-col gap-10">
            <h1 className="border-b pb-2">Description</h1>
            <p className="text-sm text-slate-700">
              <strong>Shraj</strong> {productDetail?.name} offer a range of
              sizes and heating arrangements to meet a variety of batch heating
              applications. Challenge us with your toughest oven applications!{" "}
              <strong>Shraj</strong> Products is not restricted to industrial
              oven standard model sizes and, instead, will custom build an
              industrial oven to meet your specifications.
            </p>
            <div className="flex flex-col gap-5">
              <h1 className="font-semibold text-xl">Main Features</h1>
              <div className="flex flex-col gap-2">
                {mainFeatres.map((feature) => (
                  <div className="flex items-center gap-2" key={feature}>
                    <span>•</span>{" "}
                    <p className="text-sm w-[70%] text-slate-700">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
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
              scrollbarWidth: "none" /* Firefox */,
              msOverflowStyle: "none" /* Internet Explorer 10+ */,
            }}
          >
            {otherProducts.map((item) => (
              <Link href={`/all-products/${item.id}`}>
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-6 hover:shadow-lg transition-shadow flex-shrink-0 w-72"
                >
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
