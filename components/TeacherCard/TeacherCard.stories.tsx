import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import avatar from '../../public/images/teacher-image.jpg'

import TeacherCard from './index'
import ShadowContainer from '../ShadowContainer'

export default {
  title: 'Components/TeacherCard',
  component: TeacherCard,
} as ComponentMeta<typeof TeacherCard>

const Template: ComponentStory<typeof TeacherCard> = (args) => <TeacherCard {...args} />
const TemplateWithShadowContainer: ComponentStory<typeof TeacherCard> = (args) => (
  <ShadowContainer>
    <TeacherCard {...args} />
  </ShadowContainer>
)

const model = {
  id: '1',
  fullname: 'Name Surname',
  country: 'Ukraine',
  image: {
    src: avatar,
    alt: 'Name Surname',
  },
  raiting: 4,
  lang_speaking: ['english', 'ukrainian'],
  lang_teaching: ['english', 'ukrainian', 'french'],
  description:
    'Strengthening and development of the structure allows you to perform important tasks on the development of a personnel training system that meets urgent needs. Strengthening and development of the structure allows you to perform important tasks on the development of a personnel training system that meets urgent needs.',
}
export const Default = Template.bind({})
Default.args = {
  ...model,
}

export const WithShadowContainer = TemplateWithShadowContainer.bind({})
WithShadowContainer.args = {
  ...model,
}
