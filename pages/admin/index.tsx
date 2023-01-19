import React from 'react'

import { useSelector } from 'react-redux'
import { selectAuthState } from 'redux/slices/auth'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import PrivateLayoutPage from 'pages/privateLayoutPage'

import AccountForm from '../../components/Forms/AccountForm'

function Account() {
  const authState = useSelector(selectAuthState)

  return (
    <div>
      <Box marginBottom={3}>
        <Typography variant="h5" className="MuiTypography">
          Account
        </Typography>
      </Box>
      {authState && <AccountForm />}
    </div>
  )
}

Account.getLayout = PrivateLayoutPage

export default Account
