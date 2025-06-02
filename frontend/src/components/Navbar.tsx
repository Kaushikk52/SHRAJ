"use client";

import { navlinks } from "@/constants/constant";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import MobileSidebar from "./MobileSidebar";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [openMobileSidebar, setOpenMobileSidebar] = useState(false);

  const path = usePathname();

  return (
    <div className="p-2 w-full">
      <div
        className={`flex items-center justify-between max-w-7xl mx-auto py-5`}
      >
        <Link href={"/"}>
          <div>
            <Image
              src={"/logo.png"}
              alt="SHRAJ-logo"
              height={150}
              width={150}
            />
          </div>
        </Link>
        <div className="flex items-center gap-5">
          <div className="hidden md:block">
            <div className="flex items-center gap-8">
              {navlinks.map((nav) => (
                <Link href={nav.path} key={nav.tag}>
                  <h1
                    className={`font-semibold cursor-pointer ${
                      path === nav.path
                        ? "text-[#2E2F91] font-bold underline py-2"
                        : "text-black"
                    }`}
                  >
                    {nav.tag}
                  </h1>
                </Link>
              ))}
            </div>
          </div>
          <Link href={"/contact"}>
            <button className="border bg-[#2E2F91] hidden md:block hover:bg-blue-600 transition duration-300 py-1 px-3 md:py-2 md:px-5 rounded-full text-white font-semibold cursor-pointer">
              Contact Us
            </button>
          </Link>
          <div
            className="block md:hidden"
            onClick={() => setOpenMobileSidebar(true)}
          >
            <RxHamburgerMenu size={20} color="black" />
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
