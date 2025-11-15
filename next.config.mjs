/** @type {import('next').NextConfig} */
const nextConfig = {
  // AWS Amplify configuration
  // For Amplify, we use the default Next.js output (not standalone)
  // Amplify handles SSR automatically for Next.js apps
  
  // Image optimization configuration
  images: {
    // Set to true if you want to use Next.js Image Optimization API
    // For Amplify, this works with their CDN
    unoptimized: false,
    // Add remote patterns if you're using external images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Enable strict mode for better development experience
  reactStrictMode: true,
  
  // Ensure proper handling of trailing slashes
  trailingSlash: false,
  
  // Production source maps (optional, can disable for smaller builds)
  productionBrowserSourceMaps: false,
  
  // Compiler options
  compiler: {
    // Remove console logs in production (optional)
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
};

export default nextConfig;
