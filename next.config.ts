import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "unsplash.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "example.com", // Add your mock domain here
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // Recommended: if you plan to use Cloudinary later
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
