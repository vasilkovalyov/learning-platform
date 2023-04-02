import React, { Fragment, useState, useEffect } from 'react'

import { useSelector } from 'react-redux'
import { selectAuthState } from 'redux/slices/auth'

import { useForm, useFieldArray } from 'react-hook-form'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'

import ModalPopupBox from 'components/ModalPopupBox'

import EducationForm, { defaultInitialDate as initialDateEducationForm } from '../../EducationForm'
import WorkExperienceForm, { defaultInitialDate as initialDateWorkExperienceForm } from '../../WorkExperienceForm'

import Icon from 'components/Generic/Icon'
import { IconEnum } from 'components/Generic/Icon/Icon.type'

import { ITeacherPrivateDataEditableProps } from './Teacher.type'
import colors from 'constants/colors'

import getFormatDurationTime from 'common/formatDurationTime'
import studentAges from 'static-data/students-ages.json'

import teacherService from 'services/teacher.service'
import { ITeacherEducation, ITeacherWorkExperience } from 'interfaces/teacher.interface'

type FieldType = keyof Pick<ITeacherPrivateDataEditableProps, 'country' | 'state' | 'city' | 'address'>

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

const initialData: ITeacherPrivateDataEditableProps = {
  about_info: '',
  city: '',
  country: '',
  state: '',
  address: '',
  lessons_prices: [
    {
      count: '',
      price: '',
    },
  ],
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
  lesson_duration: 0,
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
  lessons: [],
}

function TeacherPrivateDataForm() {
  const authState = useSelector(selectAuthState)

  const [modalEducationOpen, setModalEducationOpen] = useState<boolean>(false)
  const [modalWorkExperienceOpen, setModalWorkExperienceOpen] = useState<boolean>(false)
  const [selectedWorkExperience, setSelectedWorkExperience] = useState<ITeacherWorkExperience | null>(null)
  const [selectedEducation, setSelectedEducation] = useState<ITeacherEducation | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const { handleSubmit, control, register, setValue, reset, getValues } = useForm<ITeacherPrivateDataEditableProps>({
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

  function onSuccess(data: ITeacherPrivateDataEditableProps) {
    console.log('data', data)
  }

  function onSubmitEducationForm(data: ITeacherEducation) {
    if (selectedIndex !== null) {
      onUpdateEducationForm(data)
      return
    }
    setValue(`education.${education.length - 1}`, data)
    appendEducation(initialDateEducationForm)

    setSelectedEducation(null)
    handleCloseModal('education')
  }

  function onSubmitWorkExperienceForm(data: ITeacherWorkExperience) {
    if (selectedIndex !== null) {
      onUpdateWorkExperienceForm(data)
      return
    }
    setValue(`work_experience.${workExperience.length - 1}`, data)
    appendWorkExperience(initialDateWorkExperienceForm)
    setSelectedWorkExperience(null)
    handleCloseModal('work_experience')
  }

  function onUpdateEducationForm(data: ITeacherEducation) {
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

  function onUpdateWorkExperienceForm(data: ITeacherWorkExperience) {
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

  async function loadFormData() {
    try {
      const response = await teacherService.getUserPrivateData(authState.user._id)
      reset({
        ...response.data,
        work_experience: [
          ...response.data.work_experience,
          {
            company_name: '',
          },
        ],
        education: [
          ...response.data.education,
          {
            university_name: '',
          },
        ],
      })
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    loadFormData()
  }, [])

  return (
    <Box pb={10}>
      <form className="form-private-data form-private-data--teacher">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
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
                          {(index === 0 && workExperience.length === 1) ||
                          (index > 0 && index === workExperience.length - 1) ? (
                            <Button
                              className="form-button-field form-button-field--add"
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
                              className="form-button-field form-button-field--edit"
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
                    label={index === 0 ? 'Education' : ' '}
                    variant="standard"
                    className="form-field"
                    fullWidth
                    disabled
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      endAdornment: (
                        <>
                          {(index === 0 && education.length === 1) || (index > 0 && index === education.length - 1) ? (
                            <Button
                              className="form-button-field form-button-field--add"
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
                              className="form-button-field form-button-field--edit"
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
            <Button type="submit" variant="contained" onClick={handleSubmit(onSuccess)}>
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
    </Box>
  )
}

export default TeacherPrivateDataForm
