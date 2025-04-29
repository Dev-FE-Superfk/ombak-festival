/** @type {import('next').NextConfig} */
import path from 'path';
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'styles')],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/videos/',
          outputPath: 'static/videos/',
          name: '[name].[hash].[ext]',
          esModule: false,
        },
      },
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms-api-ombak.reviewstagepro.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cms-api.ombakfestival.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ombakfestival.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ombakx.reviewstagepro.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cms-api-ombakx.reviewstagepro.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // images: {
  //     domains: ['cms-api-ombak.reviewstagepro.com', 'cms-api.ombakfestival.com', 'ombakfestival.com', 'www.ombakfestival.com'], // Tambahkan domain di sini
  // },
};

export default nextConfig;
