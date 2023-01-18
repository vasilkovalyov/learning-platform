import React from 'react'

import Typography from '@mui/material/Typography'

import PrivateLayoutPage from 'pages/privateLayoutPage'

function Account() {
  return (
    <div>
      <Typography variant="h5" className="MuiTypography">
        Account
      </Typography>
    </div>
  )
}

Account.getLayout = PrivateLayoutPage

export default Account
