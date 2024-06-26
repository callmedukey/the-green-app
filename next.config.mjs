/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { esmExternals: "loose" },
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false,
    };
    return config;
  },
};

export default nextConfig;
