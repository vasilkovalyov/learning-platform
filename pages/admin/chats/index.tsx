import React from 'react'

import Typography from '@mui/material/Typography'

import PrivateLayoutPage from 'pages/privateLayoutPage'

const Chats = () => {
  return (
    <div>
      <Typography variant="h4" className="MuiTypography">
        Chats
      </Typography>
    </div>
  )
}

Chats.getLayout = PrivateLayoutPage

export default Chats
