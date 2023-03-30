import React from 'react'
import Link from 'next/link'
import type { NextPage } from 'next'
import Head from 'next/head'

import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

import PublicLayout from 'layouts/BaseLayout'

import ContainerWithShadow from 'components/Generic/ContainerWithShadow'

import { LoginProps } from 'interfaces/user.interface'
import FormLogin from 'components/Forms/Login'

import { useSignIn } from 'hooks/useSignIn'

const Auth: NextPage = () => {
  const { isLoading, validationMessage, signIn } = useSignIn()

  async function onSubmit({ email, password }: LoginProps) {
    signIn(email, password)
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
