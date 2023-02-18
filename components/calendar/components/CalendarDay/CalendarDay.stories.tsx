import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import CalendarDay from './index'

import { model as eventsData } from '../CalendarEvents/CalendarEvents.model'

export default {
  title: 'Components/Calendar/Day',
  component: CalendarDay,
} as ComponentMeta<typeof CalendarDay>

const Template: ComponentStory<typeof CalendarDay> = (args) => <CalendarDay {...args} />

export const Default = Template.bind({})
Default.args = {
  events: eventsData,
}
