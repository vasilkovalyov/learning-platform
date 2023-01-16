import '../styles/scss/main.scss'

import * as nextImage from 'next/image';

Object.defineProperty(nextImage, 'default', {
  configurable: true,
  value: props => <img {...props} />
});


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
