import { BlogData } from "@/constants/constant";
import Image from "next/image";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

export default function BlogDetailPage() {
  const blog = BlogData[0];
  return (
    <div className="bg-[#F4F7FB] min-h-screen px-4 py-10">
      <div className="max-w-7xl mx-auto pt-20 flex flex-col gap-8 text-[#29343d] font-manrope">
        <div className="flex flex-col gap-10 items-center mx-auto">
          <div className="text-center flex items-center justify-center gap-5 uppercase">
            <Link href={"/"}>
              <span className="hover:text-purple-800 font-manrope text-slate-500 cursor-pointer font-semibold">
                Home
              </span>
            </Link>
            <FaChevronRight className="text-gray-400" strokeWidth={1} />
            <Link href={"/blogs"}>
              <span className="hover:text-purple-800 font-manrope text-slate-500 cursor-pointer font-semibold">
                Blogs
              </span>
            </Link>
            <FaChevronRight className="text-gray-400" strokeWidth={1} />
            <span className="text-purple-800 font-manrope cursor-pointer font-semibold">
              {blog.tag}
            </span>
          </div>
          <div className="text-center md:w-[80%] mx-auto">
            <h1 className="text-5xl font-manrope font-semibold text-[#29343d]">
              {blog.title}
            </h1>
          </div>
          <span className="text-center text-sm text-gray-500 mx-auto flex items-center gap-1">
            <span className="text-xl">○</span> {blog.time}
          </span>
          <div className="relative w-full h-[300px] lg:h-[600px] rounded-lg overflow-hidden">
            <Image
              src={blog.img}
              alt="blog-image"
              fill
              priority
              className="object-cover"
              quality={100}
            />
          </div>
        </div>
        <div className="grid grid-cols-[70%_30%] gap-5">
          <div className="bg-white h-screen rounded-xl"></div>
          <div className="bg-white h-64 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}
