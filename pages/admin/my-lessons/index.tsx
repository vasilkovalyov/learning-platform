import React from 'react'

import { useSelector } from 'react-redux'
import { selectAuthState } from 'redux/slices/auth'

import Typography from '@mui/material/Typography'

import PrivateLayoutPage from 'pages/privateLayoutPage'

import TeacherLessonsView from 'components/TeacherLessonsView'

function MyLessons() {
  const authState = useSelector(selectAuthState)

  return (
    <div>
      <Typography variant="h5" className="MuiTypography">
        My Lessons
      </Typography>
      {authState.user.role === 'teacher' ? <TeacherLessonsView /> : null}
    </div>
  )
}

MyLessons.getLayout = PrivateLayoutPage

export default MyLessons
