import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { setCookie } from 'nookies'

import { setAuthState } from 'redux/slices/auth'

import authService from 'services/authentication.service'

export function useSignIn() {
  const dispatch = useDispatch()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [validationMessage, setValidationMessage] = useState<string | null>(null)

  async function signIn(email: string, password: string) {
    try {
      setIsLoading(true)
      const response = await authService.signIn(email, password)

      dispatch(setAuthState(response.data.user))
      setCookie(null, 'token', response.data.token, { maxAge: 30 * 24 * 60 * 60 })
      setCookie(null, 'userId', response.data.user._id, { maxAge: 30 * 24 * 60 * 60 })
      setCookie(null, 'role', response.data.user.role, { maxAge: 30 * 24 * 60 * 60 })
      router.push('/admin')
      setIsLoading(false)
    } catch (e: any) {
      console.log(e)
      setIsLoading(false)
      setValidationMessage(e.response?.data.message || e?.message)
    }
  }

  return {
    isLoading,
    validationMessage,
    signIn,
  }
}
