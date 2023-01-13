import React from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import {
  RegistationTeacherFormStepProps,
  RegistrationTeacherFormSecondProps,
  TextFieldStepSecondType,
} from './RegistrationTeacher.type'

import { RegistrationTeacherFormSecondSchema } from 'utils/schemas/registration/teacher'

export const initialData = {
  country: '',
  state: '',
  city: '',
  address: '',
}

function RegistrationTeacherStepTwo({
  values,
  inputFields,
  nextStep,
  handleFormData,
}: RegistationTeacherFormStepProps<RegistrationTeacherFormSecondProps>) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegistrationTeacherFormSecondProps>({
    mode: 'onChange',
    resolver: yupResolver(RegistrationTeacherFormSecondSchema),
    defaultValues: initialData,
  })

  return (
    <form name="form-registration-teacher-step-2" autoComplete="off" onSubmit={handleSubmit(nextStep)}>
      {inputFields &&
        inputFields.map((inputName: TextFieldStepSecondType, index) => (
          <TextField
            key={index}
            {...register(inputName, {
              onChange: (e) => handleFormData(e.target.name, e.target.value),
            })}
            id={inputName}
            name={inputName}
            type="text"
            label={inputName}
            defaultValue={values[inputName]}
            variant="standard"
            className="form-field"
            fullWidth
            InputLabelProps={{ shrink: true }}
            error={!!errors[inputName]?.message}
            helperText={errors[inputName]?.message}
          />
        ))}
      <Button type="submit" variant="contained">
        Next
      </Button>
    </form>
  )
}

export default RegistrationTeacherStepTwo
