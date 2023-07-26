/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'pbs.twimg.com',
      'cdn.pixabay.com',
      'upload.wikimedia.org',
      'images.unsplash.com',
    ],
  },
}

module.exports = nextConfig
