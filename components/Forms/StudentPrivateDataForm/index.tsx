import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { selectAuthState } from 'redux/slices/auth'

import { useForm, useFieldArray } from 'react-hook-form'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'

import { StudentPrivateFormData } from './StudentPrivateDataForm.type'

import Notification from 'components/Notification'
import Icon from 'components/Generic/Icon'
import { IconEnum } from 'components/Generic/Icon/Icon.type'

import colors from 'constants/colors'

import studentSerivce from 'services/student.service'

type FieldType = keyof Omit<StudentPrivateFormData, 'subjects_learning' | 'about_info'>

const locationFields: { label: string; field: FieldType }[] = [
  {
    label: 'Country',
    field: 'country',
  },
  {
    label: 'State',
    field: 'state',
  },
  {
    label: 'City',
    field: 'city',
  },
  {
    label: 'Address',
    field: 'address',
  },
]

const initialData: StudentPrivateFormData = {
  country: '',
  state: '',
  city: '',
  address: '',
  about_info: '',
  subjects_learning: [
    {
      subject: '',
      level: '',
    },
  ],
}

function StudentPrivateDataForm() {
  const authState = useSelector(selectAuthState)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showNotificaton, setShowNotificaton] = useState<boolean>(false)

  const { handleSubmit, register, control, setValue } = useForm<StudentPrivateFormData>({
    mode: 'onSubmit',
    defaultValues: initialData,
  })

  const {
    fields: subjectsLearning,
    remove: removeSubjectsLearning,
    append: appendSubjectsLearning,
    update: updateSubjectsLearning,
  } = useFieldArray({
    control,
    name: 'subjects_learning',
  })

  async function loadFormData() {
    const response = await studentSerivce.getUserPrivateData(authState.user._id)
    if (!response?.data) return
    for (const [key, value] of Object.entries(response?.data)) {
      if (typeof value !== 'object') {
        setValue(key as keyof Omit<StudentPrivateFormData, 'subjects_learning'>, value)
      }
    }
    if (response.data.subjects_learning.length) {
      response.data.subjects_learning.forEach((item, index) => {
        if (index === 0) {
          setValue(`subjects_learning.${index}.subject`, item.subject)
          setValue(`subjects_learning.${index}.level`, item.level)
        } else {
          updateSubjectsLearning(index, { subject: item.subject, level: item.level })
        }
      })
    }
  }

  async function onSubmit(data: StudentPrivateFormData) {
    try {
      setIsLoading(true)
      await studentSerivce.updateUserPrivateData(authState.user._id, data)
      setIsLoading(false)
      setShowNotificaton(true)
    } catch (e) {
      console.log(e)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadFormData()
  }, [])

  return (
    <form className="form-private-data form-private-data-teacher" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          {locationFields.map((field, index) => (
            <Box key={index} marginBottom={2}>
              <TextField
                {...register(field.field)}
                id={field.field}
                name={field.field}
                type="text"
                label={field.label}
                variant="standard"
                className="form-field"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          ))}
        </Grid>
        <Grid item xs={12} md={5}>
          <Box marginBottom={2}>
            <TextField
              {...register('about_info')}
              id={'about_info'}
              name={'about_info'}
              type="text"
              label={'about_info'}
              className="form-field"
              fullWidth
              InputLabelProps={{ shrink: true }}
              multiline
              rows={7}
              variant="standard"
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          {subjectsLearning.map((_, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item xs={12} md={5}>
                <TextField
                  {...register(`subjects_learning.${index}.subject`)}
                  id={`subjects_learning-${index}.count`}
                  type="text"
                  label="Subject"
                  variant="standard"
                  className="form-field"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: (
                      <>
                        <Button
                          className="form-button-field"
                          type="button"
                          onClick={() => {
                            appendSubjectsLearning({
                              subject: '',
                              level: '',
                            })
                          }}
                        >
                          <span className="form-button-field__icon">
                            <Icon icon={IconEnum.PLUS} color={colors.primary_color} size={10} />
                          </span>
                        </Button>
                        {index !== 0 ? (
                          <>
                            <Button
                              type="button"
                              onClick={() => removeSubjectsLearning(index)}
                              className="form-button-field form-button-field--remove"
                            >
                              <span className="form-button-field__icon">
                                <Icon icon={IconEnum.MINUS} color={colors.primary_color} size={10} />
                              </span>
                            </Button>
                          </>
                        ) : null}
                      </>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <TextField
                  {...register(`subjects_learning.${index}.level`)}
                  id={`subjects_learning-${index}.level`}
                  type="text"
                  label="Subject level"
                  variant="standard"
                  className="form-field"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid item sm={12}>
          <Box display="flex" alignItems="center">
            <Button type="submit" variant="contained">
              Save
            </Button>
            <Box ml={2}>{isLoading ? <CircularProgress size={16} /> : null}</Box>
          </Box>
        </Grid>
      </Grid>
      <Notification
        open={showNotificaton}
        setClose={() => setShowNotificaton(false)}
        direction={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {authState.user.role} updated private data successfully
      </Notification>
    </form>
  )
}

export default StudentPrivateDataForm
