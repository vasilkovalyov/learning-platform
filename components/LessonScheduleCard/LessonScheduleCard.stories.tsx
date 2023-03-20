import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import LessonScheduleCard from './index'

export default {
  title: 'Components/LessonScheduleCard',
  component: LessonScheduleCard,
} as ComponentMeta<typeof LessonScheduleCard>

const Template: ComponentStory<typeof LessonScheduleCard> = (args) => <LessonScheduleCard {...args} />

export const Default = Template.bind({})
Default.args = {
  price: 100,
  eventStart: '2023-01-25T08:00:50.015Z',
  eventEnd: '2023-01-25T09:30:50.015Z',
}
