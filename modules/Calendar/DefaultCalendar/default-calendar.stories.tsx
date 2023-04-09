import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Calendar from './index'

import { model as eventsData } from '../components/CalendarEventsList/CalendarEventsList.model'
import { CalendarModeView } from './default-calendar.type'

export default {
  title: 'Modules/Calendar/DefaultCalendar',
  component: Calendar,
} as ComponentMeta<typeof Calendar>

const Template: ComponentStory<typeof Calendar> = (args) => <Calendar {...args} />

export const Default = Template.bind({})
Default.args = {
  view: CalendarModeView.WEEK,
  events: eventsData,
  locale: 'en-En',
}
