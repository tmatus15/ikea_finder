/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.ikea.com",
      },
    ],
  },
};

module.exports = nextConfig;
