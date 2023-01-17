import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import BadgeDate from './index'

export default {
  title: 'Components/Badge/BadgeDate',
  component: BadgeDate,
} as ComponentMeta<typeof BadgeDate>

const Template: ComponentStory<typeof BadgeDate> = (args) => <BadgeDate {...args} />

export const Default = Template.bind({})
Default.args = {
  date: '2023-10-24',
}
