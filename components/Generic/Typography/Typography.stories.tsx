import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Typography from '@mui/material/Typography'

export default {
  title: 'Generic/Typography',
  component: Typography,
  argTypes: {
    variant: {
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'caption'],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Typography>

const Template: ComponentStory<typeof Typography> = (args) => <Typography {...args}>Typography</Typography>

export const Default = Template.bind({})
Default.args = {
  variant: 'h1',
}
