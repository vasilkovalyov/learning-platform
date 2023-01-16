import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import TeacherPaidCard from './index'
import { model } from './TeacherPaidCard.model'

export default {
  title: 'Components/TeacherPaidCard',
  component: TeacherPaidCard,
} as ComponentMeta<typeof TeacherPaidCard>

const Template: ComponentStory<typeof TeacherPaidCard> = (args) => <TeacherPaidCard {...args} />

export const Default = Template.bind({})
Default.args = {
  ...model,
}
