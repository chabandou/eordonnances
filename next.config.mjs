/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize production builds
  reactStrictMode: true,
  
  // Enable SWC minification for faster builds
  swcMinify: true,
  
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  
  // Experimental features for better performance
  experimental: {
    // Enable optimized package imports
    optimizePackageImports: ['framer-motion', '@heroicons/react'],
  },
  
  // Compression
  compress: true,
  
  // Optimize fonts
  optimizeFonts: true,
};

export default nextConfig;
