import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import FilterLessons from './index'
import ShadowContainer from '../ShadowContainer'

export default {
  title: 'Components/FilterLessons',
  component: FilterLessons,
} as ComponentMeta<typeof FilterLessons>

const Template: ComponentStory<typeof FilterLessons> = (args) => <FilterLessons {...args} />
const TemplateWithShadowContainer: ComponentStory<typeof FilterLessons> = (args) => (
  <ShadowContainer>
    <FilterLessons {...args} />
  </ShadowContainer>
)

export const Default = Template.bind({})
Default.args = {}

export const WithShadowContainer = TemplateWithShadowContainer.bind({})
WithShadowContainer.args = {}
