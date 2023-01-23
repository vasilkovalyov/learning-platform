import React from 'react'

import { useForm, useFieldArray } from 'react-hook-form'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import { StudentPrivateFormProps } from './StudentPrivateDataForm.type'

import Icon from 'components/Generic/Icon'
import { IconEnum } from 'components/Generic/Icon/Icon.type'

import colors from 'constants/colors'

const initialData: StudentPrivateFormProps = {
  country: '',
  state: '',
  city: '',
  address: '',
  about: '',
  subjects_learning: [
    {
      subject: '',
      level: '',
    },
  ],
}

function StudentPrivateDataForm() {
  const { handleSubmit, register, control } = useForm<StudentPrivateFormProps>({
    mode: 'onSubmit',
    defaultValues: initialData,
  })

  const {
    fields: subjectsLearning,
    remove: removeSubjectsLearning,
    append: appendSubjectsLearning,
  } = useFieldArray({
    control,
    name: 'subjects_learning',
  })

  function onSubmit(data: StudentPrivateFormProps) {
    console.log('data', data)
  }

  return (
    <form className="form-private-data form-private-data-teacher" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <Box marginBottom={2}>
            <TextField
              {...register('country')}
              id="country"
              name="country"
              type="text"
              label="Country"
              variant="standard"
              className="form-field"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          <Box marginBottom={2}>
            <TextField
              {...register('state')}
              id="state"
              name="state"
              type="text"
              label="State"
              variant="standard"
              className="form-field"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          <Box marginBottom={2}>
            <TextField
              {...register('city')}
              id="city"
              name="city"
              type="text"
              label="City"
              variant="standard"
              className="form-field"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          <Box marginBottom={2}>
            <TextField
              {...register('address')}
              id="address"
              name="address"
              type="text"
              label="Address"
              variant="standard"
              className="form-field"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box marginBottom={2}>
            <TextField
              {...register('about')}
              id={'about'}
              name={'about'}
              type="text"
              label={'about'}
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
          <Button type="submit" variant="contained">
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default StudentPrivateDataForm
