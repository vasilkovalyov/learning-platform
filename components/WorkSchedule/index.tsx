import React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

import Icon from '../Generic/Icon'
import { IconEnum } from '../Generic/Icon/Icon.type'

import { showButtonAddField, showButtonRemoveField } from '../../common/utilities'
import { IWorkScheduleProps, IWorkScheduleFormProps, IWorkScheduleFormTimeProps } from './WorkSchedule.type'

import weekNames from '../../static-data/week-names.json'
import times from '../../static-data/time.json'
import colors from '../../constants/colors'

import { useWorkSchedule } from './useWorkSchedule'

const defaultWorkSchema: IWorkScheduleFormProps = {
  work_schedule: [
    {
      dayFrom: weekNames[0].value,
      dayTo: weekNames[weekNames.length - 1].value,
      timeFrom: '08:00',
      timeTo: '22:00',
    },
  ],
}

function WorkSchedule({ onReset, onSave, initialData }: IWorkScheduleProps) {
  const { errors, scheduleFields, handleChange, handleSubmit, register, removeSchedule, reset, appendRowWorkSchedule } =
    useWorkSchedule(initialData || defaultWorkSchema)

  function onSuccess(data: IWorkScheduleFormProps) {
    reset(data)
    onSave && onSave()
  }

  function handleReset() {
    reset(defaultWorkSchema)
    onReset && onReset()
  }

  return (
    <Box className="work-schedule">
      <Box mb={4}>
        <Stack direction="row" spacing={2}>
          <Typography variant="body2" className="MuiTypography font-semibold">
            Work Schedule
          </Typography>
          <List className="work-schedule__list-date-times">
            {scheduleFields.map((item) => (
              <ListItem key={item.id}>
                <Typography variant="subtitle2" className="MuiTypography color-grey-3">
                  from {weekNames[item.dayFrom].label} to {weekNames[item.dayTo].label}
                  <span> </span>
                  from {item.timeFrom} to {item.timeTo}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Stack>
      </Box>
      <Box className="work-schedule__body" mb={4}>
        {scheduleFields.map((item, index) => (
          <Grid key={item.id} container spacing={2} className="work-schedule__item">
            <Grid item xs={12} sm={5}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...register(`work_schedule.${index}.dayFrom`, { required: true })}
                    id={`work-schedule-day-from-${index}`}
                    type="text"
                    select
                    label={index === 0 ? 'Week days' : ' '}
                    variant="standard"
                    className="form-field"
                    fullWidth
                    defaultValue={weekNames[0].value}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => {
                      handleChange(
                        e.target.name.split('.')[2] as keyof IWorkScheduleFormTimeProps,
                        e.target.value,
                        index,
                      )
                    }}
                    error={!!errors.dayFrom}
                  >
                    {weekNames.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...register(`work_schedule.${index}.dayTo`)}
                    id={`work-schedule-day-to-${index}`}
                    type="text"
                    select
                    label=" "
                    variant="standard"
                    className="form-field"
                    fullWidth
                    defaultValue={weekNames[weekNames.length - 1].value}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => {
                      handleChange(
                        e.target.name.split('.')[2] as keyof IWorkScheduleFormTimeProps,
                        e.target.value,
                        index,
                      )
                    }}
                  >
                    {weekNames.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...register(`work_schedule.${index}.timeFrom`)}
                    id={`work-schedule-time-from-${index}`}
                    label={index === 0 ? 'Time' : ' '}
                    type="time"
                    variant="standard"
                    className="form-field"
                    fullWidth
                    defaultValue={times[0].value}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300,
                    }}
                    onChange={(e) => {
                      handleChange(
                        e.target.name.split('.')[2] as keyof IWorkScheduleFormTimeProps,
                        e.target.value,
                        index,
                      )
                    }}
                    error={!!errors.timeFrom}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...register(`work_schedule.${index}.timeTo`)}
                    id={`work-schedule-time-to-${index}`}
                    label=" "
                    type="time"
                    variant="standard"
                    className="form-field"
                    fullWidth
                    defaultValue={times[0].value}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300,
                    }}
                    onChange={(e) => {
                      handleChange(
                        e.target.name.split('.')[2] as keyof IWorkScheduleFormTimeProps,
                        e.target.value,
                        index,
                      )
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={1}>
              {showButtonAddField(scheduleFields, index) ? (
                <Button
                  className="form-button-field form-button-field--add"
                  type="button"
                  disabled={errors.dayFrom !== '' || errors.timeFrom !== ''}
                  onClick={() => {
                    appendRowWorkSchedule(index)
                  }}
                >
                  <span className="form-button-field__icon">
                    <Icon icon={IconEnum.PLUS} color={colors.primary_color} size={10} />
                  </span>
                </Button>
              ) : null}
              {showButtonRemoveField(scheduleFields) ? (
                <Button
                  type="button"
                  onClick={() => removeSchedule(index)}
                  className="form-button-field form-button-field--remove"
                >
                  <span className="form-button-field__icon">
                    <Icon icon={IconEnum.MINUS} color={colors.primary_color} size={10} />
                  </span>
                </Button>
              ) : null}
            </Grid>
          </Grid>
        ))}
        {errors.dayFrom ? (
          <Typography variant="body2" color="error">
            {errors.dayFrom}
          </Typography>
        ) : null}
        {errors.timeFrom ? (
          <Typography variant="body2" color="error">
            {errors.timeFrom}
          </Typography>
        ) : null}
      </Box>
      <Stack direction="row" spacing={2} marginBottom={2} alignContent="baseline">
        <Button variant="contained" color="primary" onClick={handleSubmit(onSuccess)}>
          Save
        </Button>
        <Button variant="outlined" color="primary" onClick={handleReset}>
          Clear
        </Button>
      </Stack>
    </Box>
  )
}

export default WorkSchedule
