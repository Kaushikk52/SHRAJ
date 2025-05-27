import { BlogData } from "@/constants/constant";
import Image from "next/image";
import Link from "next/link";

export default function BlogsPage() {
  const heroBlog = BlogData[0];

  return (
    <div className="bg-[#F4F7FB] min-h-screen px-4 pb-10">
      <div className="max-w-7xl mx-auto pt-20 flex flex-col gap-16 text-[#29343d]">
        <div>
          <h1 className="font-manrope text-3xl md:text-4xl font-semibold text-[#29343d] mb-10">
            Our most recent articles
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl shadow overflow-hidden">
            <div className="flex flex-col gap-6 justify-center p-6 md:px-10 md:py-20">
              <span className="bg-[#F4F7FB] rounded-full w-fit text-sm font-manrope">
                {heroBlog.tag}
              </span>
              <Link href={`/blogs/${heroBlog.id}`}>
                <h2 className="font-semibold text-2xl md:text-3xl font-manrope hover:text-[#2E2F91]">
                  {heroBlog.title}
                </h2>
              </Link>
              <p className="text-slate-500 text-sm md:text-base">
                {heroBlog.desc}
              </p>
              <span className="self-end text-sm text-gray-500">
                ○ {heroBlog.time}
              </span>
            </div>
            <div className="relative w-full h-64 md:h-auto">
              <Image
                src={heroBlog.img}
                alt={`${heroBlog.title}-image`}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BlogData.map((blog, index) => (
            <Link href={`/blogs/${blog.id}`}>
              <div
                key={index}
                className="bg-white rounded-2xl shadow w-full h-[500px]"
              >
                <div className="relative w-full h-[55%] rounded-t-2xl overflow-hidden">
                  <Image
                    src={blog.img}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="space-y-2 py-5 px-5 flex flex-col gap-2">
                  <span className="bg-[#F4F7FB] rounded-full w-fit text-sm font-manrope">
                    {blog.tag}
                  </span>
                  <h2 className="font-semibold text-lg font-manrope">
                    {blog.title}
                  </h2>
                  <div className="self-end text-sm text-gray-500">
                    <span>○ {blog.time}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
