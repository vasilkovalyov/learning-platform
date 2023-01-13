import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import Head from 'next/head'

import { setCookie } from 'nookies'

import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

import PublicLayout from 'layouts/PublicLayout'

import ContainerWithShadow from 'components/Generic/ContainerWithShadow/ContainerWithShadow'

import AuthService from 'services/authentication.service'
import { UserLoginProps } from 'interfaces/user.interface'
import FormLogin from 'components/Forms/Login/Login'
import { setAuthState } from 'redux/slices/auth'

const Auth: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [validationMessage, setValidationMessage] = useState<string | null>(null)

  const router = useRouter()
  const dispatch = useDispatch()

  async function successSignUpForm({ email, password }: UserLoginProps) {
    try {
      setIsLoading(true)
      const response = await AuthService.signIn(email, password)

      setCookie(null, 'token', response.token, { maxAge: 30 * 24 * 60 * 60 })
      setCookie(null, 'userId', response.data._id, { maxAge: 30 * 24 * 60 * 60 })
      setCookie(null, 'role', response.data.role, { maxAge: 30 * 24 * 60 * 60 })

      localStorage.setItem('userId', response.data._id || '')
      dispatch(setAuthState(response.data))
      router.push('/admin')
    } catch (e) {
      console.log(e)
      setIsLoading(false)
      setValidationMessage(e.response.data.message || e.message)
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
          <Container className="container">
            <Breadcrumbs aria-label="breadcrumb">
              <Link href="/">
                <a>Home</a>
              </Link>
              <Typography>Sign in</Typography>
            </Breadcrumbs>
          </Container>
        </div>
        <ContainerWithShadow className="section-registration">
          <Container className="container">
            <Typography variant="h2" className="section-registration__heading">
              Sign in
            </Typography>
            <div>
              <div>
                <FormLogin onSuccess={successSignUpForm} isLoading={isLoading} validationMessage={validationMessage} />
              </div>
            </div>
          </Container>
        </ContainerWithShadow>
      </PublicLayout>
    </div>
  )
}

export default Auth
