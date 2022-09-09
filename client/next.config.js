/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withLess = require('next-with-less')

module.exports = {
  ...withLess({
    lessLoaderOptions: {},
  }),
  reactStrictMode: true,
  swcMinify: true,
}
