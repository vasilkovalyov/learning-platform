import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Button, { ButtonProps } from '@mui/material/Button'

export default {
  title: 'Generic/Button',
  component: Button,
  argTypes: {
    color: {
      control: 'select',
      options: ['inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning'],
    },
    variant: {
      control: 'select',
      options: ['text', 'outlined', 'contained'],
    },
    disabled: { control: 'boolean', defaultValue: false },
  },
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}>Button</Button>

export const PrimaryContained = Template.bind({})
PrimaryContained.args = {
  variant: 'contained',
  color: 'primary',
}
export const PrimaryOutlined = Template.bind({})
PrimaryOutlined.args = {
  variant: 'outlined',
  color: 'primary',
}
export const Link = Template.bind({})
Link.args = {
  href: '/',
  variant: 'contained',
  color: 'primary',
}
