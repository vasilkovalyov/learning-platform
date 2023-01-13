import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import TextField from '@mui/material/TextField/TextField'
import InputAdornment from '@mui/material/InputAdornment'

import Icon from 'components/Generic/Icon/Icon'
import { IconEnum } from 'components/Generic/Icon/Icon.type'

export default {
  title: 'Forms/TextField',
  component: TextField,
  argTypes: {},
} as ComponentMeta<typeof TextField>

const Template: ComponentStory<typeof TextField> = (args) => <TextField {...args} className="form-field" />
const TemplateWithIcon: ComponentStory<typeof TextField> = (args) => (
  <TextField
    {...args}
    className="form-field"
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <Icon size={20} icon={IconEnum.EYE_ACCESS} />
        </InputAdornment>
      ),
    }}
  />
)

export const Default = Template.bind({})
Default.args = {
  label: 'Label text',
  defaultValue: 'Text',
  variant: 'standard',
}

export const Error = Template.bind({})
Error.args = {
  label: 'Label text',
  defaultValue: 'Text',
  variant: 'standard',
  error: true,
  helperText: 'Incorrect value',
}

export const WithIcon = TemplateWithIcon.bind({})
WithIcon.args = {
  label: 'Label text',
  defaultValue: 'Text',
  variant: 'standard',
}
