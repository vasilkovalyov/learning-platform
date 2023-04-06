import React, { useState } from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'

import { LessonRescheduleFormSchema } from 'utils/schemas/lesson_reschedule'

import { IRescheduleLessonFormProps } from './RescheduleLesson.type'
import { IRescheduleLessonProps } from './RescheduleLesson.type'

import generateYears from 'common/generateYears'
import getFormatDurationTime from 'common/formatDurationTime'
import { getMonthsNames, getDaysByDate } from 'common/utilities'

function RescheduleLessonForm({ onSubmit }: IRescheduleLessonFormProps) {
  const [formDate, setFormDate] = useState<IRescheduleLessonProps>({
    day: '',
    duration: '',
    month: '',
    timeStart: '',
    year: '',
  })

  const years = generateYears(new Date().getFullYear(), new Date().getFullYear() + 2)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IRescheduleLessonProps>({
    mode: 'onSubmit',
    resolver: yupResolver(LessonRescheduleFormSchema),
  })

  function onHandleChangeField(fieldName: string, fieldValue: string) {
    console.log(fieldName, fieldValue)
    setFormDate((prev) => {
      return {
        ...prev,
        [fieldName]: fieldValue,
      }
    })
  }

  return (
    <form name="form-education" className="form form-education" onSubmit={handleSubmit(onSubmit)}>
      <Box mb={4}>
        <Typography variant="h4" className="MuiTypography">
          Reschedule lesson
        </Typography>
      </Box>
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} sm={4} mb={2}>
          <TextField
            {...register('year')}
            select
            id="year"
            name="year"
            variant="standard"
            label="Year"
            type="text"
            className="form-field"
            fullWidth
            InputLabelProps={{ shrink: true }}
            error={!!errors.year?.message}
            helperText={errors.year?.message}
            defaultValue=""
            onChange={(e) => {
              onHandleChangeField(e.target.name, e.target.value)
            }}
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4} mb={2}>
          <TextField
            {...register('month')}
            select
            id="month"
            name="month"
            type="text"
            label="Month"
            variant="standard"
            className="form-field"
            fullWidth
            InputLabelProps={{ shrink: true }}
            error={!!errors.month?.message}
            helperText={errors.month?.message}
            defaultValue=""
            onChange={(e) => {
              onHandleChangeField(e.target.name, e.target.value)
            }}
          >
            {getMonthsNames().map((item) => (
              <MenuItem key={item.monthNumber} value={item.monthNumber}>
                {item.monthName}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4} mb={2}>
          <TextField
            {...register('day')}
            select
            id="day"
            name="day"
            type="text"
            label="Day"
            variant="standard"
            className="form-field"
            fullWidth
            InputLabelProps={{ shrink: true }}
            error={!!errors.day?.message}
            helperText={errors.day?.message}
            defaultValue=""
            onChange={(e) => {
              onHandleChangeField(e.target.name, e.target.value)
            }}
          >
            {getDaysByDate(+formDate.year, +formDate.month).map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} mb={2}>
          <TextField
            {...register('timeStart')}
            id="timeStart"
            name="timeStart"
            label="Time start"
            type="time"
            variant="standard"
            className="form-field"
            fullWidth
            defaultValue=""
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300,
            }}
            error={!!errors.timeStart?.message}
            helperText={errors.timeStart?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6} mb={2}>
          <TextField
            {...register('duration')}
            select
            variant="standard"
            label="Lesson duration"
            type="text"
            className="form-field"
            fullWidth
            InputLabelProps={{ shrink: true }}
            error={!!errors.duration?.message}
            helperText={errors.duration?.message}
            defaultValue=""
          >
            <MenuItem value="30">{getFormatDurationTime(30, 'long')}</MenuItem>
            <MenuItem value="60">{getFormatDurationTime(60, 'long')}</MenuItem>
            <MenuItem value="90">{getFormatDurationTime(90, 'long')}</MenuItem>
          </TextField>
        </Grid>
      </Grid>
      <Button type="submit" variant="contained">
        Reschedule
      </Button>
    </form>
  )
}

export default RescheduleLessonForm
