import React from 'react'

import { useForm } from 'react-hook-form'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import { StudentPrivateDataFormProps, StudentPrivateFormProps } from './StudentPrivateDataForm.type'

function StudentPrivateDataForm({ initialData }: StudentPrivateDataFormProps) {
  const { handleSubmit, register } = useForm<StudentPrivateFormProps>({
    mode: 'onSubmit',
    defaultValues: initialData,
  })

  function onSubmit(data: StudentPrivateFormProps) {
    console.log('data', data)
  }

  return (
    <form className="form-private-data form-private-data-teacher" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item sm={12} md={5}>
          <Box marginBottom={2}>
            <TextField
              {...register('country')}
              id="country"
              name="country"
              type="text"
              label="Country"
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
            <TextField
              {...register('address')}
              id="address"
              name="address"
              type="text"
              label="Address"
              variant="standard"
              className="form-field"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </Grid>
        <Grid item sm={12} md={5}>
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
        <Grid item sm={12}>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default StudentPrivateDataForm
