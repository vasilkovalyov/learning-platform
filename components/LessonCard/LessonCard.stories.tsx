import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import LessonCard from './index'
import { model } from './LessonCard.model'

export default {
  title: 'Components/LessonCard',
  component: LessonCard,
} as ComponentMeta<typeof LessonCard>

const Template: ComponentStory<typeof LessonCard> = (args) => <LessonCard {...args} />

export const Default = Template.bind({})
Default.args = {
  ...model,
}
