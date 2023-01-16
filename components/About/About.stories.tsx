import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import About from './index'
import { model } from './About.model'
import ShadowContainer from '../ShadowContainer'

export default {
  title: 'Components/About',
  component: About,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof About>

const Template: ComponentStory<typeof About> = (args) => <About {...args} />
const TemplateWithShadowContainer: ComponentStory<typeof About> = (args) => (
  <ShadowContainer>
    <About {...args} />
  </ShadowContainer>
)

export const Default = Template.bind({})
Default.args = {
  ...model,
}

export const WithShadowContainer = TemplateWithShadowContainer.bind({})
WithShadowContainer.args = {
  ...model,
}
