"use client";

import HeroComponent from "@/components/HeroComponent";
import Products from "@/components/Products";
import { useRef } from "react";

export default function Home() {
  const productsRef = useRef<HTMLDivElement>(null);
  return (
    <div className="bg-gray-100">
      <HeroComponent prodRef={productsRef} />
      <div
        className="flex flex-col gap-10 max-w-7xl mx-auto mt-20"
        ref={productsRef}
      >
        <h1 className="text-4xl font-bold">Some Of Our Products</h1>
        <Products />
      </div>
    </div>
  );
}
