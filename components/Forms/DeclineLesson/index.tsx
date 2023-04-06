import React from 'react'

import { useForm } from 'react-hook-form'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { IDeclineLessonProps } from './DeclineLesson.type'

function DeclineLesson({ onSubmit }: IDeclineLessonProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{
    reason: string
  }>({
    mode: 'onSubmit',
  })

  return (
    <form name="form-decline-lesson" className="form form-decline-lesson" onSubmit={handleSubmit(onSubmit)}>
      <Box mb={4}>
        <Typography variant="h5" className="MuiTypography">
          Decline lesson
        </Typography>
      </Box>
      <Box mb={4}>
        <Typography variant="h3" className="MuiTypography ta-c">
          Do you really want to remove the lesson?
        </Typography>
      </Box>
      <Box mb={4}>
        <TextField
          {...register('reason')}
          id="reason"
          name="reason"
          type="text"
          label="Reason decline the lesson"
          variant="standard"
          className="form-field"
          fullWidth
          InputLabelProps={{ shrink: true }}
          error={!!errors.reason?.message}
          helperText={errors.reason?.message}
        />
      </Box>
      <Box className="ta-c">
        <Button type="submit" variant="contained">
          Decline
        </Button>
      </Box>
    </form>
  )
}

export default DeclineLesson
