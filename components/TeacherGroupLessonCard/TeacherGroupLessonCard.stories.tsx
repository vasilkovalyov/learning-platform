import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import TeacherGroupLessonCard from './index'
import { model } from './TeacherGroupLessonCard.model'

export default {
  title: 'Components/TeacherGroupLessonCard',
  component: TeacherGroupLessonCard,
} as ComponentMeta<typeof TeacherGroupLessonCard>

const Template: ComponentStory<typeof TeacherGroupLessonCard> = (args) => <TeacherGroupLessonCard {...args} />

export const Default = Template.bind({})
Default.args = {
  ...model,
}
