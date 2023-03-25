import { useDispatch } from 'react-redux'
import { clearAuthState } from 'redux/slices/auth'
import { useRouter } from 'next/router'
import { destroyCookie } from 'nookies'

export function useSignOut() {
  const dispatch = useDispatch()
  const router = useRouter()

  function signOut() {
    router.push('/').then(() => {
      destroyCookie(null, 'role')
      destroyCookie(null, 'userId')
      destroyCookie(null, 'token')

      dispatch(clearAuthState())
    })
  }

  return {
    signOut,
  }
}
