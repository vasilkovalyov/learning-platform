/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withLess = require('next-with-less')

module.exports = {
  ...withLess({
    lessLoaderOptions: {},
  }),
  swcMinify: true,
  reactStrictMode: false,
  images: {
    loader: 'akamai',
    path: '',
  },
  // basePath: '/',
  // assetPrefix: '/learning-platform',
}
