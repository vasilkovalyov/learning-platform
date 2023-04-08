import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import BadgeExperience from './index'

export default {
  title: 'Components/Badge/BadgeExperience',
  component: BadgeExperience,
} as ComponentMeta<typeof BadgeExperience>

const Template: ComponentStory<typeof BadgeExperience> = (args) => <BadgeExperience {...args} />

export const Default = Template.bind({})
Default.args = {
  years: 2,
}
