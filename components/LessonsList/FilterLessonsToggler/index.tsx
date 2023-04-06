import React, { useState } from 'react'
import cn from 'classnames'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import { IFilterLessonsTogglerProps, FilterLessonValueType } from './FilterLessonsToggler.type'

function PrivateLessonsList({ title, selectedValue, filterItems, onChange }: IFilterLessonsTogglerProps) {
  const [selectedFilter, setSelectedFilter] = useState<FilterLessonValueType | null>(selectedValue || null)

  function handleClickFilterLesson(days: number | string) {
    setSelectedFilter(days)
    onChange(days)
  }

  return (
    <Stack direction="row" flexWrap="wrap" mb={2} className="filter-lessons">
      <Typography className="MuiTypography font-bold" variant="subtitle2" mr={2} mb={2}>
        {title}
      </Typography>
      <Stack direction="row" spacing={2} mb={2}>
        {filterItems.map((item, index) => (
          <Button
            variant="text"
            key={index}
            onClick={() => handleClickFilterLesson(item.days)}
            className={cn('filter-lessons__filter-button', {
              'filter-lessons__filter-button--active': selectedFilter === item.days,
            })}
          >
            {item.label}
          </Button>
        ))}
      </Stack>
    </Stack>
  )
}

export default PrivateLessonsList
