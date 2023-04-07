import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Opportunity from './index'
import ShadowContainer from '../ShadowContainer'

import { model } from './Opportunity.model'

export default {
  title: 'Components/Opportunity',
  component: Opportunity,
} as ComponentMeta<typeof Opportunity>

const Template: ComponentStory<typeof Opportunity> = (args) => <Opportunity {...args} />
const TemplateWithShadowContainer: ComponentStory<typeof Opportunity> = (args) => (
  <ShadowContainer>
    <Opportunity {...args} />
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
