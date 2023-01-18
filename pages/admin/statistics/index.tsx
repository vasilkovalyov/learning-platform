import React from 'react'

import Typography from '@mui/material/Typography'

import PrivateLayoutPage from 'pages/privateLayoutPage'

const Statistics = () => {
  return (
    <div>
      <Typography variant="h5" className="MuiTypography">
        Statistics
      </Typography>
    </div>
  )
}

Statistics.getLayout = PrivateLayoutPage

export default Statistics
