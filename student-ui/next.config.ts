/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatar.iran.liara.run',
        port: '',
        pathname: '/public/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/public/**',
      },
    ],
  },
};

module.exports = nextConfig;