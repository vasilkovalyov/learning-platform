/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles/scss')],
  },
  swcMinify: true,
  reactStrictMode: false,
  // basePath: '/',
  // images: {
  //   loader: 'akamai',
  //   path: '',
  // },
  // basePath: '/',
  // assetPrefix: '/learning-platform',
}
