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

import PublicLayout from 'layouts/BaseLayout'

import ContainerWithShadow from 'components/Generic/ContainerWithShadow'

import AuthService from 'services/authentication.service'
import { LoginProps } from 'interfaces/user.interface'
import FormLogin from 'components/Forms/Login'
import { setAuthState } from 'redux/slices/auth'

const Auth: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [validationMessage, setValidationMessage] = useState<string | null>(null)

  const router = useRouter()
  const dispatch = useDispatch()

  async function onSubmit({ email, password }: LoginProps) {
    try {
      setIsLoading(true)
      const response = await AuthService.signIn(email, password)

      setCookie(null, 'token', response.token, { maxAge: 30 * 24 * 60 * 60 })
      setCookie(null, 'userId', response.user._id, { maxAge: 30 * 24 * 60 * 60 })
      setCookie(null, 'role', response.user.role, { maxAge: 30 * 24 * 60 * 60 })

      dispatch(setAuthState(response.user))
      router.push('/admin')
    } catch (e: any) {
      console.log(e)
      setIsLoading(false)
      setValidationMessage(e.response?.data.message || e?.message)
    }
  }

  return (
    <div>
      <Head>
        <title>LearnLangPlatform - Sign in</title>
        <meta name="description" content="The platform for learning languages" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PublicLayout className="page-login">
        <Container className="container">
          <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
            <Link href="/">
              <a className="breadcrumbs__item">Home</a>
            </Link>
            <Typography variant="body2" className="MuiTypography breadcrumbs__item">
              Sign in
            </Typography>
          </Breadcrumbs>
          <Typography
            component="h1"
            variant="h2"
            className="MuiTypography section-registration__heading ta-c"
            marginBottom={3}
          >
            Sign in
          </Typography>
          <ContainerWithShadow className="container--login">
            <FormLogin onSubmit={onSubmit} isLoading={isLoading} validationMessage={validationMessage} />
          </ContainerWithShadow>
        </Container>
      </PublicLayout>
    </div>
  )
}

export default Auth
