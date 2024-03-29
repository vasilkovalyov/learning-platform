const path = require('path')

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
        include: path.resolve(__dirname, '../'),
      },
    ],
  },
}
