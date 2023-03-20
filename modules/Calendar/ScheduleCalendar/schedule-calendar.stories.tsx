import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import ScheduleCalendar from '.'

import { model as eventsData } from '../components/CalendarEventsList/CalendarEventsList.model'

export default {
  title: 'Modules/Calendar/ScheduleCalendar',
  component: ScheduleCalendar,
} as ComponentMeta<typeof ScheduleCalendar>

const Template: ComponentStory<typeof ScheduleCalendar> = (args) => <ScheduleCalendar {...args} />

export const Default = Template.bind({})
Default.args = {
  events: eventsData,
}
