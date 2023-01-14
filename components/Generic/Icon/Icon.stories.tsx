import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Icon from '.'
import { IconEnum } from './Icon.type'
export default {
  title: 'Generic/Icon',
  component: Icon,
  argTypes: {
    icon: {
      options: IconEnum,
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Icon>

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />

export const Default = Template.bind({})
Default.args = {
  size: 20,
}
