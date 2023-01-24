import React, { useState } from 'react'

import { useForm } from 'react-hook-form'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Slider from '@mui/material/Slider'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

import { FilterLessonsComponentProps, FilterLessonsProps, FilterFieldsFormProps } from './FilterLessons.type'

import studentsAges from '../../static-data/students-ages.json'
import langSpeaking from '../../static-data/lang-speaking.json'
import timeTeaching from '../../static-data/time-teaching.json'
import genders from '../../static-data/genders.json'
import countries from '../../static-data/countries.json'

const textFields: FilterFieldsFormProps[] = [
  {
    label: 'Language speacking',
    value: 'lang_speaking',
    options: langSpeaking,
  },
  {
    label: 'Language teaching',
    value: 'lang_teaching',
    options: langSpeaking,
  },
  {
    label: 'Time teaching',
    value: 'time_teaching',
    options: timeTeaching,
  },
  {
    label: 'Country',
    value: 'country',
    options: countries,
  },
  {
    label: 'Price start',
    value: 'price_start',
  },
  {
    label: 'Price end',
    value: 'price_end',
  },
  {
    label: 'Gender',
    value: 'gender',
    options: genders,
  },
  {
    label: 'Student ages',
    value: 'student_ages',
    options: studentsAges,
  },
]

function FilterLessons({ onSubmit }: FilterLessonsComponentProps) {
  const minPrice = 10
  const maxPrice = 1000
  const [priceValue, setPriceValue] = useState<number[]>([minPrice, maxPrice])

  const handleChange = (e: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setValue('price_start', +newValue[0])
      setValue('price_end', +newValue[1])
      setPriceValue(newValue)
    }
  }

  const { handleSubmit, register, setValue } = useForm<FilterLessonsProps>({
    mode: 'onSubmit',
    defaultValues: {},
  })

  return (
    <Box className="filter">
      <Typography variant="h6" className="MuiTypography">
        Filters
      </Typography>
      <form className="form-filter" onSubmit={handleSubmit(onSubmit)}>
        <List>
          {textFields.map((field: FilterFieldsFormProps, index: number) => {
            if (field.value === 'price_start') {
              return (
                <ListItem key={index}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        {...register('price_start')}
                        id={'price_start'}
                        name={'price_start'}
                        type="number"
                        label="Price"
                        variant="standard"
                        defaultValue={priceValue[0]}
                        className="form-field"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => {
                          const value: number = +e.currentTarget.value
                          if (value !== 0 && value < priceValue[1]) {
                            setPriceValue((prev) => [value, prev[1]])
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        {...register('price_end')}
                        id={'price_end'}
                        name={'price_end'}
                        type="number"
                        label=" "
                        variant="standard"
                        defaultValue={priceValue[1]}
                        className="form-field"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => {
                          const value: number = +e.currentTarget.value
                          if (value !== 0 && value > priceValue[0]) {
                            setPriceValue((prev) => [prev[0], value])
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Slider
                        min={minPrice}
                        max={maxPrice}
                        getAriaLabel={() => 'Temperature range'}
                        value={priceValue}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                      />
                    </Grid>
                  </Grid>
                </ListItem>
              )
            } else if (field.value === 'price_end') return
            else {
              return (
                <ListItem key={index}>
                  <TextField
                    {...register(field.value)}
                    select
                    id={field.value}
                    name={field.value}
                    type="text"
                    label={field.label}
                    variant="standard"
                    className="form-field"
                    fullWidth
                    defaultValue=""
                    InputLabelProps={{ shrink: true }}
                  >
                    {field.options &&
                      field.options.map((option) => (
                        <MenuItem key={option.id} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                  </TextField>
                </ListItem>
              )
            }
          })}
          <ListItem alignItems="center">
            <Button type="submit" fullWidth variant="contained">
              Accept
            </Button>
          </ListItem>
          <ListItem>
            <Button variant="text" className="form-filter__reset-button">
              Reset filter
            </Button>
          </ListItem>
        </List>
      </form>
    </Box>
  )
}

export default FilterLessons
