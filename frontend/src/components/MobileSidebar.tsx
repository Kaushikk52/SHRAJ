"use client";

import { X } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";
import { navlinks } from "@/constants/constant";

type SidebarProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
};

export default function MobileSidebar({
  isSidebarOpen,
  setIsSidebarOpen,
}: SidebarProps) {
  return (
    <>
      {/* BACKDROP */}
      <div
        className={clsx(
          "fixed inset-0 bg-opacity-40 transition-opacity duration-300 z-20",
          isSidebarOpen ? "opacity-40 visible" : "opacity-0 invisible"
        )}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* SIDEBAR */}
      <div
        className={clsx(
          "fixed top-0 right-0 h-full w-[70%] bg-white shadow-lg transition-transform duration-600 z-50 flex flex-col gap-10",
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end items-center p-4">
          <button onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col flex-1 px-4 gap-10">
          <div className="flex flex-col gap-8">
            {navlinks.map((item) => (
              <div key={item.tag} className="flex flex-col">
                <Link
                  href={""}
                  className={`text-sm uppercase font-medium hover:font-semibold cursor-pointer`}
                >
                  {item.tag}
                </Link>
              </div>
            ))}
            <button className="text-sm uppercase font-medium hover:font-semibold cursor-pointer text-start">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
