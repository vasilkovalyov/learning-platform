import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import GroupLessonsList from './index'
import { model } from './GroupLessonsList.model'

export default {
  title: 'Components/LessonsList/GroupLessonsList',
  component: GroupLessonsList,
} as ComponentMeta<typeof GroupLessonsList>

const Template: ComponentStory<typeof GroupLessonsList> = (args) => <GroupLessonsList {...args} />

export const Default = Template.bind({})
Default.args = {
  ...model,
}
