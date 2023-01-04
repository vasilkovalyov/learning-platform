module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
    '../components/**/*.stories.mdx',
    '../components/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    // '@storybook-addon-designs',
    '@storybook/addon-a11y',
    'storybook-addon-jsx',
    'storybook-source-code-addon',
  ],
  staticDirs: ['../public/'],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
}
