/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
  // Enable static exports
  output: 'standalone',
  // Ensure images are properly handled
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig 