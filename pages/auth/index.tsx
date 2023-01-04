import React from 'react'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import Head from 'next/head'
import Cookies from 'js-cookie'

import PublicLayout from 'layouts/PublicLayout'

import AuthService from 'services/auth'
import AuthForm, { AuthFormData } from 'components/forms/AuthForm'
import { useFormAction, IUseFormAction } from 'hooks/useFormAction'
import { setAuthState } from 'redux/slices/auth'

const initialStateFormAction: IUseFormAction = {
  isLoading: false,
  validationMessage: '',
}

const Auth: NextPage = () => {
  const [isLoading, validationMessage, toggleLoading, addValidationMessage] = useFormAction(initialStateFormAction)
  const router = useRouter()
  const dispatch = useDispatch()

  async function successSignUpForm(isSuccess: boolean, data: AuthFormData) {
    if (!isSuccess) return

    try {
      toggleLoading(true)
      const response = await AuthService.signIn(data)
      Cookies.set('token', response.token)
      Cookies.set('userId', response.data._id)
      Cookies.set('role', response.data.role)
      localStorage.setItem('userId', response.data._id || '')
      dispatch(setAuthState(response.data))
      router.push('/admin')
    } catch (e) {
      console.log(e)
      toggleLoading(false)
      addValidationMessage(e.response.data.message || e.message)
    }
  }

  return (
    <div>
      <Head>
        <title>LearnLangPlatform - Sign in</title>
        <meta name="description" content="The platform for learning languages" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PublicLayout>
        <div className="breadcrumb-block">
          <div className="container">
            <div>
              <div>
                <Link href="/">
                  <a>Home</a>
                </Link>
              </div>
              <div>Sign in</div>
            </div>
          </div>
        </div>
        <div className="section-registration">
          <div className="container">
            <h2 className="section-registration__heading">Sign in</h2>
            <div>
              <div>
                <AuthForm onSuccess={successSignUpForm} isLoading={isLoading} validationMessage={validationMessage} />
              </div>
            </div>
          </div>
        </div>
      </PublicLayout>
    </div>
  )
}

export default Auth
