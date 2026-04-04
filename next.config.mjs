/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize production builds
  reactStrictMode: true,

  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Experimental features for better performance
  experimental: {
    // Enable optimized package imports
    optimizePackageImports: ['framer-motion', '@heroicons/react'],
    // Enable View Transitions API for smooth page transitions
    // viewTransition: true,
  },

  // Compression
  compress: true,
};

export default nextConfig;
