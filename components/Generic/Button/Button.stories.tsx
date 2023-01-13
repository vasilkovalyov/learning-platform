import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Button from '@mui/material/Button/Button'

export default {
  title: 'Generic/Button',
  component: Button,
  argTypes: {},
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}>Button</Button>

export const Primary = Template.bind({})
Primary.args = {
  variant: 'contained',
}
export const Secondary = Template.bind({})
Secondary.args = {
  variant: 'outlined',
}
export const Link = Template.bind({})
Link.args = {
  disabled: false,
  href: '/',
}
