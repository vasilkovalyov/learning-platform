import React from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

import ShadowContainer from 'components/ShadowContainer'

import { GroupLessonFormSchema } from 'utils/schemas/group_lesson'

import { IGroupLessonFormProps } from './GroupLesson.type'
import { IGroupLessonProps } from 'interfaces/group-lesson.interface'

import getFormatDurationTime from 'common/formatDurationTime'
import studentAges from 'static-data/students-ages.json'

export const defaultInitialDate: IGroupLessonProps = {
  name: '',
  date: '',
  description: '',
  duration: '',
  min_count_of_students: '',
  max_count_of_students: '',
  price: '',
  recruitment_period_date_start: '',
  recruitment_period_date_end: '',
  students_level: '',
  students_age: '',
  timeStart: '',
}

async function onSuccess(data: IGroupLessonProps) {
  console.log('data', data)
}

function GroupLesson({ onSubmit, initialData }: IGroupLessonFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IGroupLessonProps>({
    mode: 'onSubmit',
    resolver: yupResolver(GroupLessonFormSchema),
    defaultValues: initialData ?? defaultInitialDate,
  })

  return (
    <form name="form-group-lesson" className="form form-group-lesson">
      <Box mb={3}>
        <ShadowContainer>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box>
                <TextField
                  {...register('name')}
                  id="name"
                  name="name"
                  type="text"
                  label="Lesson name"
                  variant="standard"
                  className="form-field"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.name?.message}
                  helperText={errors.name?.message}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box mb={2}>
                <TextField
                  {...register('date')}
                  id="date"
                  name="date"
                  type="date"
                  label="Lesson date"
                  variant="standard"
                  className="form-field"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.date?.message}
                  helperText={errors.date?.message}
                />
              </Box>
              <Box mb={2} className="form-group-lesson__date-event">
                <Typography
                  variant="subtitle1"
                  className="MuiTypography color-grey-3 font-medium form-group-lesson__date-event-label"
                >
                  Recruitment Period
                </Typography>
                <TextField
                  {...register('recruitment_period_date_start')}
                  id="recruitment_period_date_start"
                  name="recruitment_period_date_start"
                  type="date"
                  variant="standard"
                  className="form-field"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.recruitment_period_date_start?.message}
                  helperText={errors.recruitment_period_date_start?.message}
                />
                -
                <TextField
                  {...register('recruitment_period_date_end')}
                  id="recruitment_period_date_end"
                  name="recruitment_period_date_end"
                  type="date"
                  variant="standard"
                  className="form-field"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.recruitment_period_date_end?.message}
                  helperText={errors.recruitment_period_date_end?.message}
                />
              </Box>
              <Box mb={2}>
                <TextField
                  {...register('timeStart')}
                  id="timeStart"
                  name="timeStart"
                  type="time"
                  label="Lesson time start"
                  variant="standard"
                  className="form-field"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.timeStart?.message}
                  helperText={errors.timeStart?.message}
                />
              </Box>
              <Box mb={2}>
                <TextField
                  {...register('duration')}
                  id="duration"
                  select
                  variant="standard"
                  label="Lesson duration"
                  type="text"
                  className="form-field"
                  fullWidth
                  defaultValue={initialData?.duration || ''}
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.duration?.message}
                  helperText={errors.duration?.message}
                >
                  <MenuItem value="30">{getFormatDurationTime(30, 'long')}</MenuItem>
                  <MenuItem value="60">{getFormatDurationTime(60, 'long')}</MenuItem>
                  <MenuItem value="90">{getFormatDurationTime(90, 'long')}</MenuItem>
                </TextField>
              </Box>
              <Box mb={2}>
                <TextField
                  {...register('price')}
                  id="price"
                  name="price"
                  type="text"
                  label="Lesson price"
                  variant="standard"
                  className="form-field"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.timeStart?.message}
                  helperText={errors.timeStart?.message}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box mb={2}>
                <TextField
                  {...register('students_level')}
                  id="students_level"
                  name="students_level"
                  type="text"
                  label="Students level"
                  variant="standard"
                  className="form-field"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.students_level?.message}
                  helperText={errors.students_level?.message}
                />
              </Box>
              <Box mb={2}>
                <TextField
                  {...register('students_age')}
                  id="students_age"
                  select
                  variant="standard"
                  label="Students age"
                  type="text"
                  className="form-field"
                  fullWidth
                  defaultValue={initialData?.students_age || ''}
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.students_age?.message}
                  helperText={errors.students_age?.message}
                >
                  {studentAges.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <Box mb={2}>
                <TextField
                  {...register('description')}
                  id="description"
                  name="description"
                  type="text"
                  label="Description"
                  variant="standard"
                  className="form-field"
                  fullWidth
                  multiline
                  minRows={6}
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.description?.message}
                  helperText={errors.description?.message}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box mb={2}>
                <TextField
                  {...register('min_count_of_students')}
                  id="min_count_of_students"
                  name="min_count_of_students"
                  type="text"
                  label="Min count of students"
                  variant="standard"
                  className="form-field"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.min_count_of_students?.message}
                  helperText={errors.min_count_of_students?.message}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box mb={2}>
                <TextField
                  {...register('max_count_of_students')}
                  id="max_count_of_students"
                  name="max_count_of_students"
                  type="text"
                  label="Max count of students"
                  variant="standard"
                  className="form-field"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.max_count_of_students?.message}
                  helperText={errors.max_count_of_students?.message}
                />
              </Box>
            </Grid>
          </Grid>
        </ShadowContainer>
      </Box>
      <Box>
        <Button
          type="submit"
          variant="contained"
          className="form-group-lesson__button"
          onClick={handleSubmit(onSuccess)}
        >
          Create group lesson
        </Button>
        <Button className="form-group-lesson__button" variant="outlined">
          Decline
        </Button>
      </Box>
    </form>
  )
}

export default GroupLesson
