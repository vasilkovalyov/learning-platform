import { SnackbarOrigin } from '@mui/material'

export interface NotificationProps {
  children: React.ReactNode
  setClose: () => void
  open: boolean
  duration?: number
  direction: SnackbarOrigin
}
