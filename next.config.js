/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['pbs.twimg.com', 'cdn.pixabay.com', 'upload.wikimedia.org'],
  },
}

module.exports = nextConfig
