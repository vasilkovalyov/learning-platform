import React from 'react'

import Typography from '@mui/material/Typography'

import PrivateLayoutPage from 'pages/privateLayoutPage'

const Services = () => {
  return (
    <div>
      <Typography variant="h5" className="MuiTypography">
        Services
      </Typography>
    </div>
  )
}

Services.getLayout = PrivateLayoutPage

export default Services
