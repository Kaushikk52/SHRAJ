"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { products } from "@/constants/constant";
import Image from "next/image";
import Link from "next/link";
import { SetStateAction, useEffect, useState } from "react";

export default function ProductsPage() {
  const [impCategories, setImpcategories] = useState<string[] | undefined>();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const allCategories = () => {
    const categ: SetStateAction<undefined> | string[] = [];
    for (let i = 0; i < products.length; i++) {
      if (!categ.includes(products[i].type)) {
        categ.push(products[i].type);
      }
    }
    setImpcategories(categ);
  };

  useEffect(() => {
    allCategories();
  }, []);

  const handleSelectedBrand = (e: React.ChangeEvent<HTMLInputElement>) => {
    const type = e.target.value;
    const isChecked = e.target.checked;

    setSelectedTypes((prev) =>
      isChecked ? [...prev, type] : prev.filter((t) => t !== type)
    );
  };

  const filteredProducts = selectedTypes.length
    ? products.filter((product) => selectedTypes.includes(product.type))
    : products;

  const brands = ["Henny Penny", "Taylor", "Franke", "Lightfry"];

  return (
    <div className="min-h-screen bg-white py-10 max-w-7xl w-full mx-auto px-4 md:px-0">
      <h1 className="text-3xl font-bold mb-4">All Products</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filter */}
        <div className="w-full lg:w-64 border-r pr-4">
          <div>
            <h2 className="font-semibold text-lg mb-2">Equipment Type</h2>
            {impCategories?.map((type, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={type}
                  value={type}
                  onChange={handleSelectedBrand}
                  checked={selectedTypes.includes(type)}
                  className="mr-2"
                />
                <label htmlFor={type}>{type}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <ScrollArea className="h-screen">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1 relative">
            {filteredProducts.map((product) => (
              <Link href={`/all-products/${product.id}`} key={product.id}>
                <div className="bg-white rounded-xl shadow hover:shadow-md transition p-6 flex flex-col items-start cursor-pointer overflow-x-hidden">
                  {/* Image */}
                  <div className="relative w-full h-44 mb-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      layout="fill"
                      objectFit="contain"
                      className="rounded-md"
                    />
                  </div>

                  {/* Type Badge */}
                  <span className="bg-blue-900 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {product.type}
                  </span>

                  {/* Title */}
                  <h2 className="mt-3 text-lg font-semibold text-gray-900 truncate">
                    {product.name}
                  </h2>

                  {/* Description */}
                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
