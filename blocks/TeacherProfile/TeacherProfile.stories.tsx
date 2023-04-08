import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import TeacherProfileCard from './index'
import ShadowContainer from '../../components/ShadowContainer'

import { model } from './TeacherProfile.model'

export default {
  title: 'Blocks/TeacherProfileCard',
  component: TeacherProfileCard,
} as ComponentMeta<typeof TeacherProfileCard>

const Template: ComponentStory<typeof TeacherProfileCard> = (args) => <TeacherProfileCard {...args} />
const TemplateWithShadowContainer: ComponentStory<typeof TeacherProfileCard> = (args) => (
  <ShadowContainer>
    <TeacherProfileCard {...args} />
  </ShadowContainer>
)

export const Default = Template.bind({})
Default.args = {
  ...model,
}

export const WithShadowContainer = TemplateWithShadowContainer.bind({})
WithShadowContainer.args = {
  ...model,
  hasShadow: true,
}
