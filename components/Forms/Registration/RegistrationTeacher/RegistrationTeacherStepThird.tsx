import React, { Fragment } from 'react'

import { useForm, useFieldArray } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'

import { RegistrationTeacherFormDataStepThree, RegistationTeacherFormStepThreeProps } from './RegistrationTeacher.type'

import { RegistrationTeacherFormThirdSchema } from 'utils/schemas/registration/teacher'

import Icon from 'components/Generic/Icon'
import { IconEnum } from 'components/Generic/Icon/Icon.type'

import colors from 'constants/colors'

const defaultValues: RegistrationTeacherFormDataStepThree = {
  education: [{ value: '' }],
  work_experience: [{ value: '' }],
}

function RegistrationTeacherStepThird({
  validationMessage,
  isLoading,
  submitForm,
}: RegistationTeacherFormStepThreeProps) {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<RegistrationTeacherFormDataStepThree>({
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

  return (
    <form name="form-registration-teacher-step-3" autoComplete="off" onSubmit={handleSubmit(submitForm)}>
      {fieldsEducation.map(({ id, value }, index) => (
        <Fragment key={id}>
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
            InputProps={{
              endAdornment: (
                <>
                  {index >= 1 ? (
                    <Button
                      type="button"
                      onClick={() => removeEducation(index)}
                      className="form-button-field form-button-field--remove"
                    >
                      <span className="form-button-field__icon">
                        <Icon icon={IconEnum.MINUS} color={colors.primary_color} size={10} />
                      </span>
                    </Button>
                  ) : null}
                </>
              ),
            }}
          />
        </Fragment>
      ))}
      <Button
        className="form-button-field"
        type="button"
        onClick={() =>
          appendEducation({
            value: '',
          })
        }
      >
        <span className="form-button-field__icon">
          <Icon icon={IconEnum.PLUS} color={colors.primary_color} size={10} />
        </span>
        <span className="form-button-field__text font-medium color-primary text-capitalize">Add field</span>
      </Button>
      {fieldsJobs.map(({ id, value }, index) => (
        <Fragment key={index}>
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
            InputProps={{
              endAdornment: (
                <>
                  {index >= 1 ? (
                    <Button
                      type="button"
                      onClick={() => removeJob(index)}
                      className="form-button-field form-button-field--remove"
                    >
                      <span className="form-button-field__icon">
                        <Icon icon={IconEnum.MINUS} color={colors.primary_color} size={10} />
                      </span>
                    </Button>
                  ) : null}
                </>
              ),
            }}
          />
        </Fragment>
      ))}
      <Button
        className="form-button-field"
        type="button"
        onClick={() =>
          appendJob({
            value: '',
          })
        }
      >
        <span className="form-button-field__icon">
          <Icon icon={IconEnum.PLUS} color={colors.primary_color} size={10} />
        </span>
        <span className="form-button-field__text font-medium color-primary text-capitalize">Add field</span>
      </Button>
      <Button type="submit" variant="contained" fullWidth>
        Create account
      </Button>
      {validationMessage && <p>{validationMessage}</p>}
      {isLoading ? <LinearProgress /> : null}
    </form>
  )
}

export default RegistrationTeacherStepThird
