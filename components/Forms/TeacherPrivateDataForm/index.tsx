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

import getFormatDurationTime from 'common/formatDurationTime'

const durationTimeList = [
  {
    value: '30',
  },
  {
    value: '60',
  },
  {
    value: '90',
  },
]

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

  const {
    fields: work_experience,
    remove: removeWorkExperience,
    append: appendWorkExperience,
  } = useFieldArray({
    control,
    name: 'work_experience',
  })

  const {
    fields: levels_studying,
    remove: removeLevelsStudying,
    append: appendLevelsStudying,
  } = useFieldArray({
    control,
    name: 'levels_studying',
  })

  const {
    fields: education,
    remove: removeEducation,
    append: appendEducation,
  } = useFieldArray({
    control,
    name: 'education',
  })

  function onSuccess(data: TeacherPrivateFormProps) {
    console.log('data', data)
  }

  return (
    <form className="form-account" onSubmit={handleSubmit(onSuccess)}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box marginBottom={2}>
            <TextField
              {...register('country')}
              id={'country'}
              name={'country'}
              type="text"
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
              type="text"
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
              type="text"
              label={'city'}
              variant="standard"
              className="form-field"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          <Box marginBottom={2}>
            {languagesSpeacking.map(({ id, value }, index) => (
              <Fragment key={id}>
                <TextField
                  {...register(`lang_speacking.${index}.value`)}
                  defaultValue={value}
                  id={`languages_speacking-${index}`}
                  type="text"
                  label="Languages speacking"
                  variant="standard"
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
                />
              </Fragment>
            ))}
          </Box>
          <Box marginBottom={2}>
            {subjects.map(({ id, value }, index) => (
              <Fragment key={id}>
                <TextField
                  {...register(`subjects.${index}.value`)}
                  defaultValue={value}
                  id={`subjects-${index}`}
                  type="text"
                  label="Subjects"
                  variant="standard"
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
                />
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
              type="text"
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
              type="text"
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
          <Box marginBottom={2}></Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box marginBottom={2}>
            <TextField
              {...register(`lesson_duration`)}
              select
              variant="standard"
              label="Lesson duration"
              type="text"
              className="form-field"
              fullWidth
              defaultValue=""
              InputLabelProps={{ shrink: true }}
            >
              {durationTimeList.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {getFormatDurationTime(+option.value, 'long')}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box marginBottom={2}>
            {levels_studying.map(({ id, value }, index) => (
              <Fragment key={id}>
                <TextField
                  {...register(`levels_studying.${index}.value`)}
                  defaultValue={value}
                  id={`levels_studying-${index}`}
                  type="text"
                  label="levels_studying"
                  variant="standard"
                  className="form-field"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: (
                      <>
                        {levels_studying[index]?.id === id ? (
                          <Button
                            className="form-button-field"
                            type="button"
                            onClick={() =>
                              appendLevelsStudying({
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
                              onClick={() => removeLevelsStudying(index)}
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
              </Fragment>
            ))}
          </Box>
          <Box marginBottom={2}>
            {work_experience.map(({ id, value }, index) => (
              <Fragment key={id}>
                <TextField
                  {...register(`work_experience.${index}.value`)}
                  defaultValue={value}
                  id={`work_experience-${index}`}
                  type="text"
                  label="Work experience"
                  variant="standard"
                  className="form-field"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: (
                      <>
                        {work_experience[index]?.id === id ? (
                          <Button
                            className="form-button-field"
                            type="button"
                            onClick={() =>
                              appendWorkExperience({
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
                              onClick={() => removeWorkExperience(index)}
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
              </Fragment>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box marginBottom={2}>
            {education.map(({ id, value }, index) => (
              <Fragment key={id}>
                <TextField
                  {...register(`education.${index}.value`)}
                  defaultValue={value}
                  id={`education-${index}`}
                  type="text"
                  label="Work experience"
                  variant="standard"
                  className="form-field"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: (
                      <>
                        {education[index]?.id === id ? (
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
                          </Button>
                        ) : null}
                        {index >= 1 ? (
                          <>
                            <Button
                              type="button"
                              onClick={() => removeEducation(index)}
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
              </Fragment>
            ))}
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
