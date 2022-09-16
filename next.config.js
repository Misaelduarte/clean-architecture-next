/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');
const reactSvg = require('next-react-svg');
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

const plugins = [
  [reactSvg, { include: /\.svg$/ }],
];

module.exports = withPlugins(plugins, nextConfig);
