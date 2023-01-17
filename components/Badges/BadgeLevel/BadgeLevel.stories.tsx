import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import BadgeLevel from './index'

export default {
  title: 'Components/Badge/BadgeLevel',
  component: BadgeLevel,
} as ComponentMeta<typeof BadgeLevel>

const Template: ComponentStory<typeof BadgeLevel> = (args) => <BadgeLevel {...args} />

export const Default = Template.bind({})
Default.args = {
  level: 'Beginners',
}
