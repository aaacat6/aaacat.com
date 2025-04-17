import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'aaacat-com.oss-cn-hangzhou.aliyuncs.com',
      },
    ],
  },
};

export default nextConfig;
