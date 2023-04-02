import React from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'

import { WorkExperienceFormSchema } from 'utils/schemas/work_experience'

import { IWorkExperienceFormProps } from './WorkExperienceForm.type'
import { ITeacherWorkExperience } from 'interfaces/teacher.interface'

import monthNames from 'static-data/month-names.json'
import generateYears from 'common/generateYears'

export const defaultInitialDate: ITeacherWorkExperience = {
  company_name: '',
  position: '',
  place_destination: '',
  date_month_start: '',
  date_year_start: 0,
  date_month_end: '',
  date_year_end: 0,
}

function WorkExperienceForm({ onSubmit, initialData }: IWorkExperienceFormProps) {
  const years = generateYears()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ITeacherWorkExperience>({
    mode: 'onSubmit',
    resolver: yupResolver(WorkExperienceFormSchema),
    defaultValues: initialData ?? defaultInitialDate,
  })

  return (
    <form name="form-education" className="form form-education" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" className="MuiTypography">
            Create Work experience
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register('company_name')}
            id="company_name"
            name="company_name"
            type="text"
            label="Company name"
            variant="standard"
            className="form-field"
            fullWidth
            InputLabelProps={{ shrink: true }}
            error={!!errors.company_name?.message}
            helperText={errors.company_name?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register('position')}
            id="position"
            name="position"
            type="text"
            label="Position"
            variant="standard"
            className="form-field"
            fullWidth
            InputLabelProps={{ shrink: true }}
            error={!!errors.position?.message}
            helperText={errors.position?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register('place_destination')}
            id="place_destination"
            name="place_destination"
            type="text"
            label="Place destination"
            variant="standard"
            className="form-field"
            fullWidth
            InputLabelProps={{ shrink: true }}
            error={!!errors.place_destination?.message}
            helperText={errors.place_destination?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register(`date_month_start`)}
                select
                variant="standard"
                label="Start date working"
                type="text"
                className="form-field"
                fullWidth
                placeholder="Month"
                defaultValue={initialData?.date_month_start || ''}
                InputLabelProps={{ shrink: true }}
                error={!!errors.date_month_start?.message}
                helperText={errors.date_month_start?.message}
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
                label="End date working"
                type="text"
                className="form-field"
                fullWidth
                placeholder="Month"
                defaultValue={initialData?.date_month_end || ''}
                InputLabelProps={{ shrink: true }}
                error={!!errors.date_month_end?.message}
                helperText={errors.date_month_end?.message}
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
            {initialData !== null ? 'Update work experience' : 'Add work experience'}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default WorkExperienceForm
