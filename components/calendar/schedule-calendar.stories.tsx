import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import ScheduleCalendar from './schedule-calendar'

import { model as eventsData } from './components/CalendarEvents/CalendarEvents.model'

export default {
  title: 'Components/Calendar/ScheduleCalendar',
  component: ScheduleCalendar,
} as ComponentMeta<typeof ScheduleCalendar>

const Template: ComponentStory<typeof ScheduleCalendar> = (args) => <ScheduleCalendar {...args} />

export const Default = Template.bind({})
Default.args = {
  events: eventsData,
}
