/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8081",
        pathname: "/v1/api/blogs/images/**",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
        pathname: "/**", // NOT /images/** — Freepik may not strictly use /images
      }, {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        pathname: "/**", // NOT /images/** — Freepik may not strictly use /images
      },
    ],
  },
};

export default nextConfig;
