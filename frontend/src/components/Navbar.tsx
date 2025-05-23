"use client";

import { navlinks } from "@/constants/constant";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import MobileSidebar from "./MobileSidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [openMobileSidebar, setOpenMobileSidebar] = useState(false);

  const pathname = usePathname();
  console.log(pathname);

  return (
    <div
      className={`absolute w-full ${
        pathname === "/" ? "bg-transparent" : "bg-[#0D5CB4]"
      }`}
    >
      <div
        className={`flex items-center justify-between max-w-7xl mx-auto my-5`}
      >
        <h1 className="text-2xl md:text-4xl text-white">SHRAJ</h1>
        <div className="flex items-center gap-5">
          <div className="hidden md:block">
            <div className="flex items-center gap-8">
              {navlinks.map((nav) => (
                <Link href={nav.path} key={nav.tag}>
                  <h1 className="text-white font-semibold cursor-pointer">
                    {nav.tag}
                  </h1>
                </Link>
              ))}
            </div>
          </div>
          <button className="bg-transparent border hover:bg-blue-500 transition duration-300 py-1 px-3 md:py-2 md:px-5 rounded-full text-white font-semibold cursor-pointer">
            Contact Us
          </button>
          <div
            className="block md:hidden"
            onClick={() => setOpenMobileSidebar(true)}
          >
            <RxHamburgerMenu size={20} color="white" />
          </div>
          <MobileSidebar
            isSidebarOpen={openMobileSidebar}
            setIsSidebarOpen={setOpenMobileSidebar}
          />
        </div>
      </div>
    </div>
  );
}
