import React, { useState, ChangeEvent } from 'react'
import Image from 'next/image'

import Box from '@mui/material/Box'
import Autocomplete, { AutocompleteChangeReason } from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import Icon from 'components/Generic/Icon'
import { IconEnum } from 'components/Generic/Icon/Icon.type'

import { IStudentsForLessonProps, IStudentForLessonProps } from './StudentsForLesson.type'
import colors from 'constants/colors'

import defaultAvatarImage from '../../public/images/avatar-default.jpg'

const defaultSelectedStudent: IStudentForLessonProps = {
  _id: '',
  fullname: '',
}

function StudentsForLesson({ message, students, onChangeStudent, excludeStudent }: IStudentsForLessonProps) {
  const [selectedStudentInfo, setSelectedStudentInfo] = useState<IStudentForLessonProps | null>(null)
  const [selectedStudents, setSelectedStudents] = useState<IStudentForLessonProps[]>([])

  function addStudent(student: IStudentForLessonProps) {
    const updatedStudents = [...selectedStudents, student]
    setSelectedStudents(updatedStudents)
    setSelectedStudentInfo(null)
    onChangeStudent(updatedStudents)
  }

  function removeStudent(id: string) {
    const updatedStudents = selectedStudents.filter((student) => student._id !== id)
    setSelectedStudents(updatedStudents)
    onChangeStudent(updatedStudents)
  }

  const handleAutocompleteChange = (_: any, newValue: IStudentForLessonProps | null) => {
    if (newValue) {
      setSelectedStudentInfo(newValue)
    }
  }

  const isOptionEqualToValue = (option: IStudentForLessonProps, value: IStudentForLessonProps) =>
    option._id === value._id

  return (
    <Box className="students-for-lesson">
      <Box mb={2} className="students-for-lesson__field-box">
        <Typography
          variant="subtitle1"
          className="MuiTypography color-grey-3 font-medium form-group-lesson__date-event-label"
        >
          Add student
        </Typography>
        <Autocomplete
          id="students-field"
          autoHighlight
          options={students}
          value={selectedStudentInfo}
          isOptionEqualToValue={isOptionEqualToValue}
          getOptionLabel={(option) => option.fullname}
          onChange={handleAutocompleteChange}
          renderOption={(props, option) => {
            return (
              <Box key={option._id} flex="flex" component="li" {...props}>
                {option.imageSrc ? (
                  <Image src={option.imageSrc} loading="lazy" width="20" height="20" alt={option.fullname} />
                ) : (
                  <Image src={defaultAvatarImage} loading="lazy" width="20" height="20" alt={option.fullname} />
                )}
                <Box mr={1}></Box>
                <Box component="span" id={option._id}>
                  {option.fullname}
                </Box>
              </Box>
            )
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              type="text"
              variant="standard"
              className="form-field"
              fullWidth
              inputProps={{
                ...params.inputProps,
              }}
            />
          )}
        />
        <Button
          className="form-button-field students-for-lesson__field-button"
          type="button"
          disabled={selectedStudentInfo?.fullname === ''}
          onClick={() => selectedStudentInfo && addStudent(selectedStudentInfo)}
        >
          <Box component="span" className="form-button-field__icon">
            <Icon icon={IconEnum.PLUS} color={colors.primary_color} size={10} />
          </Box>
        </Button>
      </Box>
      {selectedStudents.length ? (
        <>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="subtitle2" className="MuiTypography color-grey-3 font-medium">
              Students
            </Typography>
            <Typography variant="subtitle2" className="MuiTypography font-medium">
              {selectedStudents.length} Participant
            </Typography>
          </Box>
          <Box className="students-for-lesson__list">
            {selectedStudents.map((student, index) => (
              <Box key={index} className="students-for-lesson__list-item">
                <Box component="span" className="font-medium color-dark-blue-1">
                  {student.fullname}
                </Box>
                <Button
                  className="students-for-lesson__list-item-button"
                  type="button"
                  onClick={() => removeStudent(student._id)}
                >
                  <Box component="span" className="form-button-field__icon">
                    <Icon icon={IconEnum.MINUS} color={colors.primary_color} size={10} />
                  </Box>
                </Button>
              </Box>
            ))}
          </Box>
        </>
      ) : (
        <Typography variant="body2" className="MuiTypography">
          {message}
        </Typography>
      )}
    </Box>
  )
}

export default StudentsForLesson
