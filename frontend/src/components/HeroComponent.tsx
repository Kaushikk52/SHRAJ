import { RefObject } from "react";
import { FaArrowDown } from "react-icons/fa";

type HeroComponentRef = {
  prodRef: RefObject<HTMLDivElement | null>;
};

export default function HeroComponent({ prodRef }: HeroComponentRef) {
  return (
    <div className="h-[100vh] bg-[url('/hero-image-og.jpeg')] bg-cover bg-center bg-no-repeat text-white flex items-center justify-center mx-auto">
      <div className="flex items-center justify-center h-full flex-col gap-5">
        <h1 className="text-2xl md:text-4xl font-bold text-center text-balance">
          we power & support scientific innovation
        </h1>
        <p className="w-[70%] text-center md:text-sm text-xs">
          Leading brand in scientific equipment for Colleges, Labs, Pharma,
          Hospitals, and Research Industries — trusted across public and private
          sectors.
        </p>
        <h1
          className="flex items-center gap-2 cursor-pointer border rounded-full p-2 group hover:bg-blue-400 duration-300 transition"
          onClick={() =>
            prodRef.current?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <span className="border rounded-full p-1 group-hover:bg-blue-500">
            <FaArrowDown size={16} />
          </span>
          <p className="text-xl font-semibold">View Products</p>
        </h1>
      </div>
    </div>
  );
}
