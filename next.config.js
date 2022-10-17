/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');
const reactSvg = require('next-react-svg');
// const optimizedImages = require('react-optimized-images/next');

const isDev = process.env.NEXT_PUBLIC_ENVIRONMENT === 'development';

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

const plugins = [
  [reactSvg, { include: /\.svg$/ }],
  // [optimizedImages, { enabled: !isDev, minWidth: 400 }]
];

module.exports = withPlugins(plugins, nextConfig);
