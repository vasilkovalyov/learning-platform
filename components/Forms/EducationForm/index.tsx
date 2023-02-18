import React from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'

import { EducationFormSchema } from 'utils/schemas/education'

import { EducationFormProps, EducationProps } from './EducationForm.type'

import monthNames from 'static-data/month-names.json'
import generateYears from 'common/generateYears'

export const defaultInitialDate: EducationProps = {
  university_name: '',
  faculty: '',
  specialization: '',
  start_month_education: '',
  start_year_education: '',
  end_month_education: '',
  end_year_education: '',
}

function EducationForm({ onSubmit, initialData }: EducationFormProps) {
  const years = generateYears()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<EducationProps>({
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
                {...register(`start_month_education`)}
                select
                variant="standard"
                label="Start date education"
                type="text"
                className="form-field"
                fullWidth
                placeholder="Month"
                defaultValue={initialData?.start_month_education || ''}
                InputLabelProps={{ shrink: true }}
                error={!!errors.start_month_education?.message}
                helperText={errors.start_month_education?.message}
              >
                {monthNames.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register(`start_year_education`)}
                select
                variant="standard"
                label=" "
                type="text"
                className="form-field"
                fullWidth
                placeholder="year"
                defaultValue={initialData?.start_year_education || ''}
                InputLabelProps={{ shrink: true }}
                error={!!errors.start_year_education?.message}
                helperText={errors.start_year_education?.message}
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
                {...register(`end_month_education`)}
                select
                variant="standard"
                label="End date education"
                type="text"
                className="form-field"
                fullWidth
                placeholder="Month"
                defaultValue={initialData?.end_month_education || ''}
                InputLabelProps={{ shrink: true }}
                error={!!errors.end_month_education?.message}
                helperText={errors.end_month_education?.message}
              >
                {monthNames.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register(`end_year_education`)}
                select
                variant="standard"
                label=" "
                type="text"
                className="form-field"
                fullWidth
                placeholder="year"
                defaultValue={initialData?.end_year_education || ''}
                InputLabelProps={{ shrink: true }}
                error={!!errors.end_year_education?.message}
                helperText={errors.end_year_education?.message}
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
