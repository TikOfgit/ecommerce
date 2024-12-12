/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.ibb.co', 'res.cloudinary.com'],
    formats: ['image/avif', 'image/webp'],
  },
  i18n: {
    locales: ['fr'],
    defaultLocale: 'fr',
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig
