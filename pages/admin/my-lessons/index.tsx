import React from 'react'

import Typography from '@mui/material/Typography'

import PrivateLayoutPage from 'pages/privateLayoutPage'

function MyLessons() {
  return (
    <div>
      <Typography variant="h5" className="MuiTypography">
        My Lessons
      </Typography>
    </div>
  )
}

MyLessons.getLayout = PrivateLayoutPage

export default MyLessons
