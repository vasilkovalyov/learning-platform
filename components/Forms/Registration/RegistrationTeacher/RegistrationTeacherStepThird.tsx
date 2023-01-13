import React from 'react'

import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'

import {
  RegistationTeacherFormFinalStepProps,
  RegistationTeacherFormDynamicListProps,
} from './RegistrationTeacher.type'

import { RegistrationTeacherFormThirdSchema } from 'utils/schemas/registration/teacher'

import Icon from 'components/Icon'
import { IconEnum } from 'components/Generic/Icon/Icon.type'

const defaultValues: RegistationTeacherFormDynamicListProps = {
  education: [{ value: '' }],
  work_experience: [{ value: '' }],
}

function RegistrationTeacherStepThird({
  validationMessage,
  isLoading,
  finalStep,
}: RegistationTeacherFormFinalStepProps) {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<RegistationTeacherFormDynamicListProps>({
    mode: 'onSubmit',
    resolver: yupResolver(RegistrationTeacherFormThirdSchema),
    defaultValues: defaultValues,
  })

  const {
    fields: fieldsEducation,
    remove: removeEducation,
    append: appendEducation,
  } = useFieldArray({
    control,
    name: 'education',
  })

  const {
    fields: fieldsJobs,
    remove: removeJob,
    append: appendJob,
  } = useFieldArray({
    control,
    name: 'work_experience',
  })

  const onSubmit: SubmitHandler<RegistationTeacherFormDynamicListProps> = (data) => {
    finalStep({
      education: data.education.map((item) => item.value),
      work_experience: data.work_experience.map((item) => item.value),
    })
  }

  return (
    <form name="form-registration-teacher-step-3" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      {fieldsEducation.map(({ id, value }, index) => (
        <div key={id}>
          <TextField
            {...register(`education.${index}.value`)}
            defaultValue={value}
            id={`education-${index}`}
            type="text"
            label="education"
            variant="standard"
            className="form-field"
            fullWidth
            InputLabelProps={{ shrink: true }}
            error={!!errors.education?.[index]?.value?.message}
            helperText={errors.education?.[index]?.value?.message}
          />
          <button type="button" onClick={() => removeEducation(index)}>
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          appendEducation({
            value: '',
          })
        }
      >
        Add education
      </button>
      {fieldsJobs.map(({ id, value }, index) => (
        <div key={id}>
          <TextField
            {...register(`work_experience.${index}.value`)}
            defaultValue={value}
            id={`work_experience-${index}`}
            type="text"
            label="work_experience"
            variant="standard"
            className="form-field"
            fullWidth
            InputLabelProps={{ shrink: true }}
            error={!!errors.work_experience?.[index]?.value?.message}
            helperText={errors.work_experience?.[index]?.value?.message}
          />
          <button type="button" onClick={() => removeJob(index)}>
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          appendJob({
            value: '',
          })
        }
      >
        Add work experience
      </button>
      <Button type="submit" variant="contained" fullWidth>
        Create account
      </Button>
      {validationMessage && <p>{validationMessage}</p>}
      {isLoading ? <LinearProgress /> : null}
    </form>
  )
}

export default RegistrationTeacherStepThird
