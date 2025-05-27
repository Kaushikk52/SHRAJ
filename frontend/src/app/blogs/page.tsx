"use server";

import { BlogData } from "@/constants/constant";
import Image from "next/image";
import Link from "next/link";
import axios, { AxiosResponse } from "axios";
import { Blog } from "@/Models/Blog";

export default async function BlogsPage() {
  const res: any = async () => {
    try {
      return await axios.get("http://localhost:8081/v1/api/blogs/all");
    } catch (error: any) {
      console.error("Error fetching blogs:", error.message);
      return [];
    }
  };

  const { data }: AxiosResponse<any, any> = await res();
  if (!data || data.blogs.length === 0) {
    return (
      <div className="bg-[#F4F7FB] min-h-screen flex items-center justify-center">
        <h1 className="text-2xl text-gray-700">No blogs available</h1>
      </div>
    );
  }

  const heroBlog: Blog = data.blogs[0];

  console.log("Hero Blog:", data.blogs.length);

  return (
    <div className="bg-[#F4F7FB] min-h-screen px-4 pb-10">
      <div className="max-w-7xl mx-auto pt-20 flex flex-col gap-16 text-[#29343d]">
        <div>
          <h1 className="font-manrope text-3xl md:text-4xl font-semibold text-[#29343d] mb-10">
            Our most recent articles
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl shadow overflow-hidden">
            {/* IMAGE FIRST on mobile, SECOND on desktop */}
            <div className="relative w-full h-64 md:h-auto order-1 md:order-2">
              <Image
                src={heroBlog.heroImage}
                alt={`${heroBlog.title}-image`}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* TEXT SECOND on mobile, FIRST on desktop */}
            <div className="flex flex-col gap-6 justify-center p-6 md:px-10 md:py-20 order-2 md:order-1">
              <span className="w-fit text-sm font-manrope">
                {heroBlog.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="mr-2 bg-[#d7d9db] rounded-full px-3 py-1 capitalize"
                  >
                    {tag}
                  </span>
                ))}
              </span>
              <Link href={`/blogs/${heroBlog.id}`}>
                <h2 className="font-semibold text-2xl md:text-3xl font-manrope hover:text-[#2E2F91]">
                  {heroBlog.title}
                </h2>
              </Link>
              <p className="text-slate-500 text-sm md:text-base">
                {heroBlog.content}
              </p>
              <span className="self-end text-sm text-gray-500">
                ○{" "}
                {new Date(heroBlog.createdAt).toLocaleString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.blogs.slice(1).map((blog: any, index: any) => (
            <Link href={`/blogs/${blog.id}`} key={index}>
              <div
                key={index}
                className="bg-white rounded-2xl shadow w-full h-[500px]"
              >
                <div className="relative w-full h-[55%] rounded-t-2xl overflow-hidden">
                  <Image
                    src={blog.heroImage}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="space-y-2 py-5 px-5 flex flex-col gap-2">
                  <span className="w-fit text-sm font-manrope">
                    {heroBlog.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="mr-2 bg-[#d7d9db] rounded-full px-3 py-1 capitalize"
                  >
                    {tag}
                  </span>
                ))}
                  </span>
                  <h2 className="font-semibold text-lg font-manrope">
                    {blog.title}
                  </h2>
                  <div className="self-end text-sm text-gray-500">
                    <span>
                      ○{" "}
                      {new Date(heroBlog.createdAt).toLocaleString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
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
