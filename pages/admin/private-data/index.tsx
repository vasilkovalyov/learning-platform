import React from 'react'

import Typography from '@mui/material/Typography'

import PrivateLayoutPage from 'pages/privateLayoutPage'

const PrivateCard = () => {
  return (
    <div>
      <Typography variant="h5" className="MuiTypography">
        Private Data
      </Typography>
    </div>
  )
}

PrivateCard.getLayout = PrivateLayoutPage

export default PrivateCard
