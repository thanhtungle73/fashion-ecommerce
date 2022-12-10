/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: '.next',
  testEnvironment: 'node',
  images: {
    domains: ['product.hstatic.net', 'res.cloudinary.com', 'firebasestorage.googleapis.com'],
  },
}

module.exports = nextConfig
