"use client";

import type React from "react";
import { useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ProductImageProps {
  images: string[];
}

export function ProductImageZoom({ images }: ProductImageProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const { left, top, width, height } =
      imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const selectImage = (index: number) => {
    setSelectedImageIndex(index);
  };

  return (
    <div className="flex flex-col items-center w-full gap-10">
      {/* Centered image box */}
      <div className="w-[90%] max-w-[450px] relative bg-white border shadow-md p-4 rounded-md">
        <div
          className="relative w-full aspect-[5/4] overflow-hidden"
          ref={imageContainerRef}
          onMouseMove={selectedImageIndex === 0 ? handleMouseMove : undefined}
          onMouseEnter={
            selectedImageIndex === 0 ? () => setShowZoom(true) : undefined
          }
          onMouseLeave={
            selectedImageIndex === 0 ? () => setShowZoom(false) : undefined
          }
        >
          <Image
            src={images[selectedImageIndex] || "/placeholder.svg"}
            alt="Product Image"
            fill
            className="object-contain transition-transform duration-200"
            style={{
              transform:
                showZoom && selectedImageIndex === 0
                  ? "scale(1.05)"
                  : "scale(1)",
            }}
            priority
          />

          {showZoom && selectedImageIndex === 0 && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `url(${images[selectedImageIndex]})`,
                backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                backgroundSize: "200%",
                backgroundRepeat: "no-repeat",
              }}
            />
          )}

          {/* Navigation */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white opacity-80 hover:opacity-100"
            onClick={prevImage}
            disabled={images.length <= 1}
          >
            <ChevronLeft className="h-4 w-4 text-black" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white opacity-80 hover:opacity-100"
            onClick={nextImage}
            disabled={images.length <= 1}
          >
            <ChevronRight className="h-4 w-4 text-black" />
          </Button>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="mt-4 w-[90%] max-w-[450px] flex justify-center gap-2 overflow-x-auto scrollbar-thin">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "cursor-pointer border overflow-hidden flex-shrink-0 w-20 h-20 relative",
              selectedImageIndex === index
                ? " border border-red-300"
                : "border-gray-300"
            )}
            onClick={() => selectImage(index)}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt="Thumbnail"
              fill
              className="object-contain bg-white"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
