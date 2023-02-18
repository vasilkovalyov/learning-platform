import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import CalendarMonth from './index'

import { model as eventsData } from '../CalendarEvents/CalendarEvents.model'

export default {
  title: 'Components/Calendar/Month',
  component: CalendarMonth,
} as ComponentMeta<typeof CalendarMonth>

const Template: ComponentStory<typeof CalendarMonth> = (args) => <CalendarMonth {...args} />

export const Default = Template.bind({})
Default.args = {
  events: eventsData,
}
