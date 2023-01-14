import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import BookingPrivateLesson from '.'
import { model } from './BookingPrivateLesson.model'

export default {
  title: 'Components/BookingPrivateLesson',
  component: BookingPrivateLesson,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof BookingPrivateLesson>

const Template: ComponentStory<typeof BookingPrivateLesson> = (args) => <BookingPrivateLesson {...args} />

export const Default = Template.bind({})
Default.args = {
  ...model,
}
