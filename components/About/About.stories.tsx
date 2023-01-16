import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import About from './index'
import { model } from './About.model'

export default {
  title: 'Components/About',
  component: About,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof About>

const Template: ComponentStory<typeof About> = (args) => <About {...args} />

export const Default = Template.bind({})
Default.args = {
  ...model,
}
