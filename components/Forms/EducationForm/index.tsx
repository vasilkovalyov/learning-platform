import React from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'

import { EducationFormSchema } from 'utils/schemas/education'

import { IEducationFormProps } from './EducationForm.type'
import { ITeacherEducation } from 'interfaces/teacher.interface'

import { getMonthsNames } from 'common/utilities'
import generateYears from 'common/generateYears'

export const defaultInitialDate: ITeacherEducation = {
  university_name: '',
  faculty: '',
  specialization: '',
  date_month_start: '',
  date_year_start: 0,
  date_month_end: '',
  date_year_end: 0,
}

function EducationForm({ onSubmit, initialData }: IEducationFormProps) {
  const years = generateYears()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ITeacherEducation>({
    mode: 'onSubmit',
    resolver: yupResolver(EducationFormSchema),
    defaultValues: initialData ?? defaultInitialDate,
  })

  return (
    <form name="form-education" className="form form-education" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" className="MuiTypography">
            Create Education
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register('university_name')}
            id="university_name"
            name="university_name"
            type="text"
            label="University name"
            variant="standard"
            className="form-field"
            fullWidth
            InputLabelProps={{ shrink: true }}
            error={!!errors.university_name?.message}
            helperText={errors.university_name?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register('faculty')}
            id="faculty"
            name="faculty"
            type="text"
            label="Faculty"
            variant="standard"
            className="form-field"
            fullWidth
            InputLabelProps={{ shrink: true }}
            error={!!errors.faculty?.message}
            helperText={errors.faculty?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register('specialization')}
            id="specialization"
            name="specialization"
            type="text"
            label="Specialization"
            variant="standard"
            className="form-field"
            fullWidth
            InputLabelProps={{ shrink: true }}
            error={!!errors.specialization?.message}
            helperText={errors.specialization?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register(`date_month_start`)}
                select
                variant="standard"
                label="Start date education"
                type="text"
                className="form-field"
                fullWidth
                placeholder="Month"
                defaultValue={initialData?.date_month_start || ''}
                InputLabelProps={{ shrink: true }}
                error={!!errors.date_month_start?.message}
                helperText={errors.date_month_start?.message}
              >
                {getMonthsNames().map((option) => (
                  <MenuItem key={option.monthNumber} value={option.monthNumber}>
                    {option.monthName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register(`date_year_start`)}
                select
                variant="standard"
                label=" "
                type="text"
                className="form-field"
                fullWidth
                placeholder="year"
                defaultValue={initialData?.date_year_start || ''}
                InputLabelProps={{ shrink: true }}
                error={!!errors.date_year_start?.message}
                helperText={errors.date_year_start?.message}
              >
                {years.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register(`date_month_end`)}
                select
                variant="standard"
                label="End date education"
                type="text"
                className="form-field"
                fullWidth
                placeholder="Month"
                defaultValue={initialData?.date_month_end || ''}
                InputLabelProps={{ shrink: true }}
                error={!!errors.date_month_end?.message}
                helperText={errors.date_month_end?.message}
              >
                {getMonthsNames().map((option) => (
                  <MenuItem key={option.monthNumber} value={option.monthNumber}>
                    {option.monthName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register(`date_year_end`)}
                select
                variant="standard"
                label=" "
                type="text"
                className="form-field"
                fullWidth
                placeholder="year"
                defaultValue={initialData?.date_year_end || ''}
                InputLabelProps={{ shrink: true }}
                error={!!errors.date_year_end?.message}
                helperText={errors.date_year_end?.message}
              >
                {years.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained">
            {initialData !== null ? 'Update education' : 'Add education'}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default EducationForm
