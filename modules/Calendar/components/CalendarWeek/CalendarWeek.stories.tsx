import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import CalendarWeek from './index'

import { model as eventsData } from '../CalendarEventsList/CalendarEventsList.model'

export default {
  title: 'Modules/Calendar/View/Week',
  component: CalendarWeek,
} as ComponentMeta<typeof CalendarWeek>

const Template: ComponentStory<typeof CalendarWeek> = (args) => <CalendarWeek {...args} />

export const Default = Template.bind({})
Default.args = {
  events: eventsData,
}
