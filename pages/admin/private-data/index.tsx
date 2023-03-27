import React from 'react'

import { useSelector } from 'react-redux'
import { selectAuthState } from 'redux/slices/auth'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import PrivateLayoutPage from 'pages/privateLayoutPage'

import StudentPrivateDataForm from 'components/Forms/StudentPrivateDataForm'
import TeacherPrivateDataForm from 'components/Forms/TeacherPrivateDataForm'

function PrivateData() {
  const authState = useSelector(selectAuthState)

  return (
    <>
      <Box marginBottom={3}>
        <Typography variant="h5" className="MuiTypography">
          Private Data
        </Typography>
      </Box>
      {authState.user.role === 'student' ? <StudentPrivateDataForm /> : null}
      {authState.user.role === 'teacher' ? <TeacherPrivateDataForm /> : null}
    </>
  )
}

PrivateData.getLayout = PrivateLayoutPage

export default PrivateData
