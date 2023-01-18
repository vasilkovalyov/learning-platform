import React from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'

import {
  RegistationTeacherFormStepProps,
  RegistrationTeacherFormFirst,
  TextFieldStepFirstType,
} from './RegistrationTeacher.type'

import { RegistrationTeacherFormFirstSchema } from 'utils/schemas/registration/teacher'

import Icon from 'components/Generic/Icon'
import { IconEnum } from 'components/Generic/Icon/Icon.type'

export const initialData = {
  fullname: '',
  email: '',
  login: '',
  password: '',
  confirm_password: '',
  phone: '',
}

function RegistrationTeacherStepOne({
  inputFields,
  nextStep,
  handleFormData,
}: RegistationTeacherFormStepProps<RegistrationTeacherFormFirst, TextFieldStepFirstType>) {
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegistrationTeacherFormFirst>({
    mode: 'onChange',
    resolver: yupResolver(RegistrationTeacherFormFirstSchema),
    defaultValues: {
      fullname: '',
      email: '',
      login: '',
      password: '',
      confirm_password: '',
      phone: '',
    },
  })

  return (
    <form name="form-registration-teacher-step-1" autoComplete="off" onSubmit={handleSubmit(nextStep)}>
      {inputFields?.map((inputName: TextFieldStepFirstType, index) => {
        if (inputName === 'password') {
          return (
            <Box key={index} marginBottom={2}>
              <TextField
                {...register('password', {
                  onChange: (e) => handleFormData(e.target.name, e.target.value),
                })}
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                label="Password"
                variant="standard"
                className="form-field"
                fullWidth
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" onClick={() => setShowPassword((show) => !show)}>
                      <Icon size={20} icon={showPassword ? IconEnum.EYE_ACCESS : IconEnum.EYE_DENIED} />
                    </InputAdornment>
                  ),
                }}
                error={!!errors.password?.message}
                helperText={errors.password?.message}
              />
            </Box>
          )
        }
        if (inputName === 'confirm_password') {
          return (
            <Box key={index} marginBottom={2}>
              <TextField
                {...register('confirm_password', {
                  onChange: (e) => handleFormData(e.target.name, e.target.value),
                })}
                id="confirm_password"
                name="confirm_password"
                type={showConfirmPassword ? 'text' : 'password'}
                label="Confirm Password"
                variant="standard"
                className="form-field"
                fullWidth
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" onClick={() => setShowConfirmPassword((show) => !show)}>
                      <Icon size={20} icon={showConfirmPassword ? IconEnum.EYE_ACCESS : IconEnum.EYE_DENIED} />
                    </InputAdornment>
                  ),
                }}
                error={!!errors.confirm_password?.message}
                helperText={errors.confirm_password?.message}
              />
            </Box>
          )
        }
        return (
          <Box key={index} marginBottom={2}>
            <TextField
              {...register(inputName)}
              {...register(inputName, {
                onChange: (e) => handleFormData(e.target.name, e.target.value),
              })}
              id={inputName}
              name={inputName}
              type={inputName}
              label={inputName}
              variant="standard"
              className="form-field"
              fullWidth
              InputLabelProps={{ shrink: true }}
              error={!!errors[inputName]?.message}
              helperText={errors[inputName]?.message}
            />
          </Box>
        )
      })}
      <Button type="submit" variant="contained">
        Next
      </Button>
    </form>
  )
}

export default RegistrationTeacherStepOne
