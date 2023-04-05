import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import WorkSchedule from './index'

export default {
  title: 'Components/WorkSchedule',
  component: WorkSchedule,
} as ComponentMeta<typeof WorkSchedule>

const Template: ComponentStory<typeof WorkSchedule> = (args) => <WorkSchedule {...args} />

export const Default = Template.bind({})
Default.args = {
  initialData: {
    work_schedule: [
      {
        dayFrom: 0,
        dayTo: 6,
        timeFrom: '08:00',
        timeTo: '22:00',
      },
    ],
  },
}
