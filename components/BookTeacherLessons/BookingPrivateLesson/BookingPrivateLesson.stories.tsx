import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import BookingPrivateLesson from './index'
import { model } from './BookingPrivateLesson.model'

import ShadowContainer from '../../ShadowContainer'

export default {
  title: 'Components/BookingPrivateLesson',
  component: BookingPrivateLesson,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof BookingPrivateLesson>

const Template: ComponentStory<typeof BookingPrivateLesson> = (args) => <BookingPrivateLesson {...args} />
const TemplateWithShadowContainer: ComponentStory<typeof BookingPrivateLesson> = (args) => (
  <ShadowContainer>
    <BookingPrivateLesson {...args} />
  </ShadowContainer>
)

export const Default = Template.bind({})
Default.args = {
  ...model,
}

export const WithShadowContainer = TemplateWithShadowContainer.bind({})
WithShadowContainer.args = {
  ...model,
}
