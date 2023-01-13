// import '!style-loader!css-loader!sass-loader!../styles/scss/main.scss'
import '../styles/scss/main.scss'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'centered',
  knobs: { disabled: true },
  docs: {
    inlineStories: false,
  },
  previewTabs: {
    canvas: {
      title: 'Preview',
      hidden: false,
    },
    'storybook/docs/panel': {
      title: 'Guidelines',
      hidden: false,
    },
  },
}

const { addDecorator } = require('@storybook/react')
const { jsxDecorator } = require('storybook-addon-jsx')

addDecorator(jsxDecorator)
