import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Resume from './index'
import ShadowContainer from '../../components/ShadowContainer'

import { model } from './Resume.model'

export default {
  title: 'Blocks/Resume',
  component: Resume,
} as ComponentMeta<typeof Resume>

const Template: ComponentStory<typeof Resume> = (args) => <Resume {...args} />
const TemplateWithShadowContainer: ComponentStory<typeof Resume> = (args) => (
  <ShadowContainer>
    <Resume {...args} />
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
