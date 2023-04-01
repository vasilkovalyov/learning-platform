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
  dateStart: {
    month: '',
    year: 0,
  },
  dateEnd: {
    month: '',
    year: 0,
  },
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
                {...register(`dateStart.month`)}
                select
                variant="standard"
                label="Start date working"
                type="text"
                className="form-field"
                fullWidth
                placeholder="Month"
                defaultValue={initialData?.dateStart?.month || ''}
                InputLabelProps={{ shrink: true }}
                error={!!errors.dateStart?.message}
                helperText={errors.dateStart?.message}
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
                {...register(`dateStart.year`)}
                select
                variant="standard"
                label=" "
                type="text"
                className="form-field"
                fullWidth
                placeholder="year"
                defaultValue={initialData?.dateStart?.year || ''}
                InputLabelProps={{ shrink: true }}
                error={!!errors.dateStart?.year?.message}
                helperText={errors.dateStart?.year?.message}
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
                {...register(`dateEnd.month`)}
                select
                variant="standard"
                label="End date working"
                type="text"
                className="form-field"
                fullWidth
                placeholder="Month"
                defaultValue={initialData?.dateEnd?.month || ''}
                InputLabelProps={{ shrink: true }}
                error={!!errors.dateEnd?.month?.message}
                helperText={errors.dateEnd?.month?.message}
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
                {...register(`dateEnd.year`)}
                select
                variant="standard"
                label=" "
                type="text"
                className="form-field"
                fullWidth
                placeholder="year"
                defaultValue={initialData?.dateEnd?.year || ''}
                InputLabelProps={{ shrink: true }}
                error={!!errors.dateEnd?.year?.message}
                helperText={errors.dateEnd?.year?.message}
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
