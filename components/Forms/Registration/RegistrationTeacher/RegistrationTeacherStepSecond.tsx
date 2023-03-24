import React from 'react'
import cn from 'classnames'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import {
  RegistationTeacherFormStepTwoProps,
  RegistrationTeacherFormDataStepTwo,
  TextFieldStepSecondType,
} from './RegistrationTeacher.type'

import { RegistrationTeacherFormSecondSchema } from 'utils/schemas/registration/teacher'

export const initialData = {
  country: '',
  state: '',
  city: '',
  address: '',
}

function RegistrationTeacherStepTwo({ submitForm, disable, closeDisable }: RegistationTeacherFormStepTwoProps) {
  const inputFields: TextFieldStepSecondType[] = ['country', 'state', 'city', 'address']

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegistrationTeacherFormDataStepTwo>({
    mode: 'onChange',
    resolver: yupResolver(RegistrationTeacherFormSecondSchema),
    defaultValues: initialData,
  })

  return (
    <Box onClick={closeDisable}>
      <form
        name="form-registration-teacher-step-2"
        autoComplete="off"
        onSubmit={handleSubmit(submitForm)}
        className={cn({ 'form-step--disable': disable })}
      >
        {inputFields &&
          inputFields.map((inputName: TextFieldStepSecondType, index) => (
            <Box key={index} marginBottom={2}>
              <TextField
                {...register(inputName)}
                id={inputName}
                name={inputName}
                type="text"
                label={inputName}
                variant="standard"
                className="form-field"
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={!!errors[inputName]?.message}
                helperText={errors[inputName]?.message}
              />
            </Box>
          ))}
        <Button type="submit" variant="contained">
          Next
        </Button>
      </form>
    </Box>
  )
}

export default RegistrationTeacherStepTwo
