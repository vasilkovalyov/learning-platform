import React from 'react'

import { useSelector } from 'react-redux'
import { selectAuthState } from 'redux/slices/auth'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import PrivateLayoutPage from 'pages/privateLayoutPage'

import StudentPrivateDataForm from 'components/Forms/StudentPrivateDataForm'
import TeacherPrivateDataForm from 'components/Forms/TeacherPrivateDataForm'
import { TeacherPrivateFormProps } from 'components/Forms/TeacherPrivateDataForm/TeacherPrivateDataForm.type'

function PrivateData() {
  const authState = useSelector(selectAuthState)

  const initialData: any = null
  const initialDataTeacher: TeacherPrivateFormProps = {
    lesson_1: '',
    lesson_5: '',
    lesson_10: '',
    lesson_20: '',
    about: '',
    city: '',
    country: '',
    state: '',
    lang_speacking: [
      {
        value: '',
      },
    ],
    subjects: [
      {
        value: '',
      },
    ],
    lesson_duration: '',
    levels_studying: [
      {
        value: '',
      },
    ],
    work_experience: [
      {
        value: '',
      },
    ],
    education: [
      {
        value: '',
      },
    ],
  }

  return (
    <>
      <Box marginBottom={3}>
        <Typography variant="h5" className="MuiTypography">
          Private Data
        </Typography>
      </Box>
      {authState?.role === 'student' ? <StudentPrivateDataForm initialData={initialData} /> : null}
      {authState?.role === 'teacher' ? <TeacherPrivateDataForm initialData={initialDataTeacher} /> : null}
    </>
  )
}

PrivateData.getLayout = PrivateLayoutPage

export default PrivateData
