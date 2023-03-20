const path = require('path')

module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
    '../components/**/*.stories.mdx',
    '../components/**/*.stories.@(js|jsx|ts|tsx)',
    '../modules/**/*.stories.mdx',
    '../modules/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    // '@storybook-addon-designs',
    '@storybook/addon-a11y',
    'storybook-addon-jsx',
    'storybook-source-code-addon',
    'storybook-addon-sass-postcss',
  ],
  staticDirs: ['../public/'],
  // framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  staticDirs: [path.resolve(__dirname, '../public')],
  presets: [path.resolve(__dirname, './next-preset.js')],
}
