import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import BadgeTime from './index'

export default {
  title: 'Components/Badge/BadgeTime',
  component: BadgeTime,
} as ComponentMeta<typeof BadgeTime>

const Template: ComponentStory<typeof BadgeTime> = (args) => <BadgeTime {...args} />

export const Default = Template.bind({})
Default.args = {
  // duration: 60,
  startTime: '10:00',
  endTime: '12:30',
}
