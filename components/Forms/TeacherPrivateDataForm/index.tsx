import React, { Fragment } from 'react'

import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import { Typography } from '@mui/material'

import Icon from 'components/Generic/Icon'
import { IconEnum } from 'components/Generic/Icon/Icon.type'

import { TeacherPrivateDataFormProps, TeacherPrivateFormProps } from './TeacherPrivateDataForm.type'
import langSpeacking from 'static-data/lang-speaking.json'
import subjectList from 'static-data/subjects.json'
import colors from 'constants/colors'

function TeacherPrivateDataForm({ initialData }: TeacherPrivateDataFormProps) {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<TeacherPrivateFormProps>({
    mode: 'onSubmit',
    defaultValues: initialData,
  })

  const {
    fields: languagesSpeacking,
    remove: removeLanguageSpeacking,
    append: appendLanguageSpeacking,
  } = useFieldArray({
    control,
    name: 'lang_speacking',
  })

  const {
    fields: subjects,
    remove: removeSubjects,
    append: appendSubjects,
  } = useFieldArray({
    control,
    name: 'subjects',
  })

  return (
    <form className="form-account">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box marginBottom={2}>
            <TextField
              {...register('country')}
              id={'country'}
              name={'country'}
              type={'country'}
              label={'country'}
              variant="standard"
              className="form-field"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          <Box marginBottom={2}>
            <TextField
              {...register('state')}
              id={'state'}
              name={'state'}
              type={'state'}
              label={'state'}
              variant="standard"
              className="form-field"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          <Box marginBottom={2}>
            <TextField
              {...register('city')}
              id={'city'}
              name={'city'}
              type={'city'}
              label={'city'}
              variant="standard"
              className="form-field"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          <Box marginBottom={2}>
            {languagesSpeacking.map(({ id, value }, index) => (
              <Fragment key={index}>
                <TextField
                  {...register(`lang_speacking.${index}.value`)}
                  defaultValue={value}
                  select
                  variant="standard"
                  label="Language speaking"
                  type="text"
                  className="form-field"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: (
                      <>
                        {languagesSpeacking[index]?.id === id ? (
                          <Button
                            className="form-button-field"
                            type="button"
                            onClick={() =>
                              appendLanguageSpeacking({
                                value: '',
                              })
                            }
                          >
                            <span className="form-button-field__icon">
                              <Icon icon={IconEnum.PLUS} color={colors.primary_color} size={10} />
                            </span>
                          </Button>
                        ) : null}
                        {index >= 1 ? (
                          <>
                            <Button
                              type="button"
                              onClick={() => removeLanguageSpeacking(index)}
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
                >
                  {langSpeacking.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Fragment>
            ))}
          </Box>
          <Box marginBottom={2}>
            {subjects.map(({ id, value }, index) => (
              <Fragment key={index}>
                <TextField
                  {...register(`subjects.${index}.value`)}
                  defaultValue={value}
                  select
                  variant="standard"
                  label="Subjects"
                  type="text"
                  className="form-field"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: (
                      <>
                        {subjects[index]?.id === id ? (
                          <Button
                            className="form-button-field"
                            type="button"
                            onClick={() =>
                              appendSubjects({
                                value: '',
                              })
                            }
                          >
                            <span className="form-button-field__icon">
                              <Icon icon={IconEnum.PLUS} color={colors.primary_color} size={10} />
                            </span>
                          </Button>
                        ) : null}
                        {index >= 1 ? (
                          <>
                            <Button
                              type="button"
                              onClick={() => removeSubjects(index)}
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
                >
                  {subjectList.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Fragment>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box marginBottom={2}>
            <TextField
              {...register('about')}
              id={'about'}
              name={'about'}
              type={'about'}
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
        <Grid item xs={12} md={12}>
          <Box marginBottom={3}>
            <Typography variant="h6" className="MuiTypography">
              Price lessons
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box marginBottom={2}>
            <TextField
              {...register('lesson_1')}
              id={'lesson_1'}
              name={'lesson_1'}
              type={'lesson_1'}
              label={'Lesson 1'}
              variant="standard"
              className="form-field"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          <Box marginBottom={2}>
            <TextField
              {...register('lesson_5')}
              id={'lesson_5'}
              name={'lesson_5'}
              type={'lesson_5'}
              label={'Lesson 5'}
              variant="standard"
              className="form-field"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box marginBottom={2}>
            <TextField
              {...register('lesson_10')}
              id={'lesson_10'}
              name={'lesson_10'}
              type={'lesson_10'}
              label={'Lesson 10'}
              variant="standard"
              className="form-field"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          <Box marginBottom={2}>
            <TextField
              {...register('lesson_20')}
              id={'lesson_20'}
              name={'lesson_20'}
              type={'lesson_20'}
              label={'Lesson 20'}
              variant="standard"
              className="form-field"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default TeacherPrivateDataForm
