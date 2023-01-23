import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import CalendarEvent from './index'

export default {
  title: 'Components/Calendar/CalendarEvent',
  component: CalendarEvent,
} as ComponentMeta<typeof CalendarEvent>

const Template: ComponentStory<typeof CalendarEvent> = (args) => <CalendarEvent {...args} />

export const Default = Template.bind({})
Default.args = {
  type: 'course',
  isCompact: false,
  title: 'Course Basic Frontend IT Home',
  subtitle: 'Lesson 2: methods',
  eventStart: '14:00',
  eventEnd: '15:30',
}
