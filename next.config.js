const path = require('path')
const withTM = require('next-transpile-modules')(['hugeicons-react'])

/** @type {import('next').NextConfig} */
module.exports = withTM({
  reactStrictMode: true,
  trailingSlash: true,
  experimental: {
    esmExternals: 'loose',
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision'),
      src: path.resolve(__dirname, './src'),
    }
    return config
  },
})