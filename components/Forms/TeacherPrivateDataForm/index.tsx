import React, { Fragment, useState } from 'react'

import { useForm, useFieldArray, UseFormRegister } from 'react-hook-form'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'

import ModalPopupBox from 'components/ModalPopupBox'

import EducationForm, { defaultInitialDate as initialDateEducationForm } from '../EducationForm'
import { EducationProps } from '../EducationForm/EducationForm.type'
import WorkExperienceForm, { defaultInitialDate as initialDateWorkExperienceForm } from '../WorkExperienceForm'
import { WorkExperienceProps } from '../WorkExperienceForm/WorkExperienceForm.type'

import Icon from 'components/Generic/Icon'
import { IconEnum } from 'components/Generic/Icon/Icon.type'

import { TeacherPrivateFormProps } from './TeacherPrivateDataForm.type'
import colors from 'constants/colors'

import getFormatDurationTime from 'common/formatDurationTime'
import studentAges from 'static-data/students-ages.json'

const initialData: TeacherPrivateFormProps | any = {
  lessons_prices: [
    {
      count: '',
      price: '',
    },
  ],
  about_info: '',
  city: '',
  country: '',
  state: '',
  lang_speaking: [
    {
      value: '',
    },
  ],
  lang_teaching: [
    {
      value: '',
    },
  ],
  subjects: [
    {
      value: '',
    },
  ],
  lesson_duration: '',
  levels_studying: [
    {
      value: '',
    },
  ],
  students_ages: [
    {
      value: '',
    },
  ],
  work_experience: [initialDateWorkExperienceForm],
  education: [initialDateEducationForm],
}

function TeacherPrivateDataForm() {
  const [modalEducationOpen, setModalEducationOpen] = useState<boolean>(false)
  const [modalWorkExperienceOpen, setModalWorkExperienceOpen] = useState<boolean>(false)
  const [selectedWorkExperience, setSelectedWorkExperience] = useState<WorkExperienceProps | null>(null)
  const [selectedEducation, setSelectedEducation] = useState<EducationProps | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const { handleSubmit, control, register, setValue, reset } = useForm<TeacherPrivateFormProps>({
    mode: 'onSubmit',
    defaultValues: initialData,
  })

  const {
    fields: languagesSpeaking,
    remove: removeLanguageSpeaking,
    append: appendLanguageSpeaking,
  } = useFieldArray({
    control,
    name: 'lang_speaking',
  })

  const {
    fields: languagesTeaching,
    remove: removeLanguageTeaching,
    append: appendLanguageTeaching,
  } = useFieldArray({
    control,
    name: 'lang_teaching',
  })

  const {
    fields: lessonsPrices,
    remove: removeLessonsPrices,
    append: appendLessonsPrices,
  } = useFieldArray({
    control,
    name: 'lessons_prices',
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
    fields: workExperience,
    remove: removeWorkExperience,
    append: appendWorkExperience,
  } = useFieldArray({
    control,
    name: 'work_experience',
  })

  const {
    fields: studentsAges,
    remove: removeStudentsAges,
    append: appendStudentsAges,
  } = useFieldArray({
    control,
    name: 'students_ages',
  })

  const {
    fields: education,
    remove: removeEducation,
    append: appendEducation,
  } = useFieldArray({
    control,
    name: 'education',
  })

  const {
    fields: levels_studying,
    remove: removeLevelsStudying,
    append: appendLevelsStudying,
  } = useFieldArray({
    control,
    name: 'levels_studying',
  })

  function handleCloseModal(modal: 'education' | 'work_experience') {
    if (modal === 'education') {
      setModalEducationOpen(false)
      setSelectedEducation(null)
    }
    if (modal === 'work_experience') {
      setModalWorkExperienceOpen(false)
      setSelectedWorkExperience(null)
    }
    setSelectedIndex(null)
  }

  function onSuccess(data: TeacherPrivateFormProps) {
    console.log('data', data)
  }

  function onSubmitEducationForm(data: EducationProps) {
    if (selectedIndex !== null) {
      onUpdateEducationForm(data)
      return
    }
    setValue(`education.${education.length - 1}`, data)
    appendEducation(initialDateEducationForm)
    setSelectedEducation(null)
    handleCloseModal('education')
  }

  function onSubmitWorkExperienceForm(data: WorkExperienceProps) {
    if (selectedIndex !== null) {
      onUpdateWorkExperienceForm(data)
      return
    }
    setValue(`work_experience.${workExperience.length - 1}`, data)
    appendWorkExperience(initialDateWorkExperienceForm)
    setSelectedWorkExperience(null)
    handleCloseModal('work_experience')
  }

  function onUpdateEducationForm(data: EducationProps) {
    if (selectedIndex !== null) {
      const updateArray = education.map((item, index) => {
        if (selectedIndex === index) return data
        return item
      })
      reset((prev) => ({ ...prev, education: updateArray }))
    }
    setSelectedEducation(null)
    setSelectedIndex(null)
    handleCloseModal('education')
  }

  function onUpdateWorkExperienceForm(data: WorkExperienceProps) {
    if (selectedIndex !== null) {
      const updateArray = workExperience.map((item, index) => {
        if (selectedIndex === index) return data
        return item
      })
      reset((prev) => ({ ...prev, work_experience: updateArray }))
    }
    setSelectedWorkExperience(null)
    setSelectedIndex(null)
    handleCloseModal('work_experience')
  }

  return (
    <>
      <form className="form-private-data form-private-data--teacher" onSubmit={handleSubmit(onSuccess)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box marginBottom={2}>
              <TextField
                {...register('country')}
                id="country"
                name="country"
                type="text"
                label="country"
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
              {languagesSpeaking.map(({ id, value }, index) => (
                <Fragment key={id}>
                  <TextField
                    {...register(`lang_speaking.${index}.value`)}
                    defaultValue={value}
                    id={`languages_speaking-${index}`}
                    type="text"
                    label="Languages speaking"
                    variant="standard"
                    className="form-field"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      endAdornment: (
                        <>
                          {languagesSpeaking[index]?.id === id ? (
                            <Button
                              className="form-button-field"
                              type="button"
                              onClick={() =>
                                appendLanguageSpeaking({
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
                                onClick={() => removeLanguageSpeaking(index)}
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
              {languagesTeaching.map(({ id, value }, index) => (
                <Fragment key={id}>
                  <TextField
                    {...register(`lang_teaching.${index}.value`)}
                    defaultValue={value}
                    id={`lang_teaching-${index}`}
                    type="text"
                    label="Languages teaching"
                    variant="standard"
                    className="form-field"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      endAdornment: (
                        <>
                          {languagesTeaching[index]?.id === id ? (
                            <Button
                              className="form-button-field"
                              type="button"
                              onClick={() =>
                                appendLanguageTeaching({
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
                                onClick={() => removeLanguageTeaching(index)}
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
                {...register('about_info')}
                id="about_info"
                name="about_info"
                type="text"
                label="About"
                className="form-field"
                fullWidth
                InputLabelProps={{ shrink: true }}
                multiline
                rows={7}
                variant="standard"
              />
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
                          {index !== 0 ? (
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
            <Box marginBottom={2}>
              {studentsAges.map(({ id }, index) => (
                <Fragment key={id}>
                  <TextField
                    {...register(`students_ages.${index}.value`)}
                    id={`students_ages-${index}`}
                    type="text"
                    select
                    label="Students ages"
                    variant="standard"
                    className="form-field"
                    fullWidth
                    defaultValue=""
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      endAdornment: (
                        <>
                          {studentsAges[index]?.id === id ? (
                            <Button
                              className="form-button-field"
                              type="button"
                              onClick={() =>
                                appendStudentsAges({
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
                                onClick={() => removeStudentsAges(index)}
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
                    {studentAges.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.value}
                      </MenuItem>
                    ))}
                  </TextField>
                </Fragment>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={12}>
            <Box marginBottom={3}>
              <Typography variant="h6" className="MuiTypography">
                Price lessons
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            {lessonsPrices.map(({ count, price }, index) => (
              <Grid container key={index}>
                <Grid item sm={6}>
                  <TextField
                    {...register(`lessons_prices.${index}.count`)}
                    id={`lessons_prices-${index}.count`}
                    type="text"
                    label="Lesson count"
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
                              appendLessonsPrices({
                                count: '',
                                price: '',
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
                                onClick={() => removeLessonsPrices(index)}
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
                <Grid item sm={6}>
                  <TextField
                    {...register(`lessons_prices.${index}.price`)}
                    id={`lessons_prices-${index}.price`}
                    type="text"
                    label="Lesson price"
                    variant="standard"
                    className="form-field"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            ))}
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
                <MenuItem value="30">{getFormatDurationTime(30, 'long')}</MenuItem>
                <MenuItem value="60">{getFormatDurationTime(60, 'long')}</MenuItem>
                <MenuItem value="90">{getFormatDurationTime(90, 'long')}</MenuItem>
              </TextField>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box marginBottom={2}></Box>
          </Grid>
          <Grid item xs={12} md={6}>
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
              {workExperience.map((_, index) => (
                <Fragment key={index}>
                  <TextField
                    {...register(`work_experience.${index}.company_name`)}
                    id={`work_experience-${index}`}
                    type="text"
                    label="Work experience"
                    variant="standard"
                    className="form-field"
                    fullWidth
                    disabled
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      endAdornment: (
                        <>
                          {workExperience[index + 1]?.company_name !== '' ||
                          workExperience[index].company_name === '' ? (
                            <Button
                              className="form-button-field"
                              type="button"
                              onClick={() => setModalWorkExperienceOpen(true)}
                            >
                              <span className="form-button-field__icon">
                                <Icon icon={IconEnum.PLUS} color={colors.primary_color} size={10} />
                              </span>
                            </Button>
                          ) : null}
                          {workExperience[index].company_name !== '' ? (
                            <Button
                              className="form-button-field"
                              type="button"
                              onClick={() => {
                                setModalWorkExperienceOpen(true)
                                setSelectedIndex(index)
                                setSelectedWorkExperience(workExperience[index])
                              }}
                            >
                              <span className="form-button-field__icon">
                                <Icon icon={IconEnum.SERVICES} color={colors.primary_color} size={10} />
                              </span>
                            </Button>
                          ) : null}
                          {index !== 0 ? (
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
              {education.map((_, index) => (
                <Fragment key={index}>
                  <TextField
                    {...register(`education.${index}.university_name`)}
                    id={`education-${index}`}
                    type="text"
                    label="Education"
                    variant="standard"
                    className="form-field"
                    fullWidth
                    disabled
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      endAdornment: (
                        <>
                          {education[index + 1]?.university_name !== '' || education[index].university_name === '' ? (
                            <Button
                              className="form-button-field"
                              type="button"
                              onClick={() => setModalEducationOpen(true)}
                            >
                              <span className="form-button-field__icon">
                                <Icon icon={IconEnum.PLUS} color={colors.primary_color} size={10} />
                              </span>
                            </Button>
                          ) : null}
                          {education[index].university_name !== '' ? (
                            <Button
                              className="form-button-field"
                              type="button"
                              onClick={() => {
                                setModalEducationOpen(true)
                                setSelectedIndex(index)
                                setSelectedEducation(education[index])
                              }}
                            >
                              <span className="form-button-field__icon">
                                <Icon icon={IconEnum.SERVICES} color={colors.primary_color} size={10} />
                              </span>
                            </Button>
                          ) : null}
                          {index !== 0 ? (
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
      <Modal open={modalEducationOpen} onClose={() => handleCloseModal('education')}>
        <>
          <ModalPopupBox type="default" onHandleClose={() => handleCloseModal('education')}>
            <Box>
              <EducationForm onSubmit={onSubmitEducationForm} initialData={selectedEducation} />
            </Box>
          </ModalPopupBox>
        </>
      </Modal>
      <Modal open={modalWorkExperienceOpen} onClose={() => handleCloseModal('work_experience')}>
        <>
          <ModalPopupBox type="default" onHandleClose={() => handleCloseModal('work_experience')}>
            <Box>
              <WorkExperienceForm onSubmit={onSubmitWorkExperienceForm} initialData={selectedWorkExperience} />
            </Box>
          </ModalPopupBox>
        </>
      </Modal>
    </>
  )
}

export default TeacherPrivateDataForm
