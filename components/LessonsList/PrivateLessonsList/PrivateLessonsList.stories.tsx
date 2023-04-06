import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import PrivateLessonsList from './index'
import { model } from './PrivateLessonsList.model'

export default {
  title: 'Components/LessonsList/PrivateLessonsList',
  component: PrivateLessonsList,
} as ComponentMeta<typeof PrivateLessonsList>

const Template: ComponentStory<typeof PrivateLessonsList> = (args) => <PrivateLessonsList {...args} />

export const Default = Template.bind({})
Default.args = {
  ...model,
}
