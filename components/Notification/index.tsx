import React from 'react'
import { NotificationProps } from './Notification.type'

import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

function Notification({ open, setClose, children, duration = 5000, direction }: NotificationProps) {
  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={setClose} anchorOrigin={direction || undefined}>
      <Alert onClose={setClose} severity="success">
        {children}
      </Alert>
    </Snackbar>
  )
}

export default Notification
