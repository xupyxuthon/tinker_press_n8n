/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'images.unsplash.com', 'lh3.googleusercontent.com'],
  },
  experimental: {
    turbo: {
      root: '.',
    },
  },
  async rewrites() {
    return [
      {
        source: '/wp-api/:path*',
        destination: 'http://localhost:8083/:path*', // 🏮 指向 Podman 中的 WordPress (8083)
      },
    ];
  },
};

export default nextConfig;
