import { useState, useEffect } from 'react'
import { AlertColor } from '@mui/material'

interface IUseNotification {
  useTimer?: boolean
  timerSpeed?: number
  successfullyMessage?: string
  errorMessage?: string
}

export function useNotfiicaton({ errorMessage, successfullyMessage, timerSpeed, useTimer = true }: IUseNotification) {
  const [isShowAlert, setIsShowAlert] = useState<boolean>(false)
  const [statusResponse, setStatusResponse] = useState<number>()
  const [alertColor, setAlertColor] = useState<AlertColor>()
  const [message, setMessage] = useState<string>()

  useEffect(() => {
    if (!useTimer) return
    const timeId = setTimeout(() => {
      setIsShowAlert(false)
    }, timerSpeed || 2000)

    return () => {
      clearTimeout(timeId)
    }
  }, [alertColor])

  useEffect(() => {
    if (!statusResponse) return
    if (statusResponse === 200) {
      setAlertColor('success')
      setMessage('successfull')
    }
    setStatusResponse(statusResponse)
    setIsShowAlert(true)
  }, [statusResponse])

  return {
    isShowAlert,
    alertColor,
    message,
    setStatusResponse,
  }
}
