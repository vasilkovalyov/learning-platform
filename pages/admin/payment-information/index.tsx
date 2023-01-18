import React from 'react'

import Typography from '@mui/material/Typography'

import PrivateLayoutPage from 'pages/privateLayoutPage'

const PaymentInformation = () => {
  return (
    <div>
      <Typography variant="h5" className="MuiTypography">
        Payment Information
      </Typography>
    </div>
  )
}

PaymentInformation.getLayout = PrivateLayoutPage

export default PaymentInformation
