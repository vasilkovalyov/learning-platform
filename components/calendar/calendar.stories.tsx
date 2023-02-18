import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Calendar from './index'

import { model as eventsData } from './components/CalendarEvents/CalendarEvents.model'
import { CalendarModeView } from './calendar.type'

export default {
  title: 'Components/Calendar/Calendar',
  component: Calendar,
} as ComponentMeta<typeof Calendar>

const Template: ComponentStory<typeof Calendar> = (args) => <Calendar {...args} />

export const Default = Template.bind({})
Default.args = {
  view: CalendarModeView.WEEK,
  events: eventsData,
}
