import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import BookingTestLesson from './index'
import { model } from './BookingTestLesson.model'

import ShadowContainer from '../../ShadowContainer'

export default {
  title: 'Components/BookingTestLesson',
  component: BookingTestLesson,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof BookingTestLesson>

const Template: ComponentStory<typeof BookingTestLesson> = (args) => <BookingTestLesson {...args} />
const TemplateWithShadowContainer: ComponentStory<typeof BookingTestLesson> = (args) => (
  <ShadowContainer>
    <BookingTestLesson {...args} />
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
