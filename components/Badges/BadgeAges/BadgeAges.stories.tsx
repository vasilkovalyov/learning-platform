import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import BadgeAges from './index'

export default {
  title: 'Components/Badge/BadgeAges',
  component: BadgeAges,
} as ComponentMeta<typeof BadgeAges>

const Template: ComponentStory<typeof BadgeAges> = (args) => <BadgeAges {...args} />

export const Default = Template.bind({})
Default.args = {
  ages: '10-15',
}
