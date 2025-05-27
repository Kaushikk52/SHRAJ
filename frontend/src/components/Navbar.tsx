"use client";

import { navlinks } from "@/constants/constant";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import MobileSidebar from "./MobileSidebar";
import Link from "next/link";
import Image from "next/image";
import AuthPopup from "./auth/AuthPopup";
import { LucideUser } from "lucide-react";

export default function Navbar() {
  const [openMobileSidebar, setOpenMobileSidebar] = useState(false);
  const [openAuth, setOpenAuth] = useState(false);

  return (
    <div className="py-2 w-full">
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
                  <h1 className="text-black font-semibold cursor-pointer">
                    {nav.tag}
                  </h1>
                </Link>
              ))}
            </div>
          </div>
          <button className="border bg-[#2E2F91] hover:bg-blue-600 transition duration-300 py-1 px-3 md:py-2 md:px-5 rounded-full text-white font-semibold cursor-pointer">
            Contact Us
          </button>
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
        <div
          onClick={() => setOpenAuth(true)}
          className="cursor-pointer text-end flex items-center gap-2"
        >
          <LucideUser /> <span>Sign In</span>
        </div>
      </div>
      <AuthPopup authOpen={openAuth} setAuthOpen={setOpenAuth} />
    </div>
  );
}
