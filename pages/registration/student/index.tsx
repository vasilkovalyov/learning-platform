import React, { useState } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'

import Container from '@mui/material/Container'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'

import PublicLayout from 'layouts/BaseLayout'
import ContainerWithShadow from 'components/Generic/ContainerWithShadow'

import RegistrationStudent from 'components/Forms/Registration/RegistrationStudent'
import { RegistrationStudentFormProps } from 'components/Forms/Registration/RegistrationStudent/RegistrationStudent.type'

import RegistrationService from 'services/registration.service'

const RegistrationStudentPage: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [validationMessage, setValidationMessage] = useState<string | null>(null)
  const [isSuccessForm, setIsSuccessForm] = useState<boolean>(false)

  function addValidationMessage(value: string) {
    setValidationMessage(value)
  }

  async function successSignUpForm(data: RegistrationStudentFormProps) {
    try {
      setIsLoading(true)
      const response = await RegistrationService.signUpStudent(data)
      setIsLoading(false)
      addValidationMessage(response.message || '')
      setIsSuccessForm(true)
    } catch (e: any) {
      setIsLoading(false)
      addValidationMessage((e.response.data && e.response.data.message) || e.message)
    }
  }

  return (
    <div>
      <Head>
        <title>LearnLangPlatform - Registration student</title>
        <meta name="description" content="The platform for learning languages" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PublicLayout className="page-registration">
        <Container className="container">
          <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
            <Link href="/">
              <a className="breadcrumbs__item">Home</a>
            </Link>
            <Typography variant="body2" className="MuiTypography breadcrumbs__item">
              Student
            </Typography>
          </Breadcrumbs>
        </Container>
        <Typography
          component="h1"
          variant="h2"
          className="MuiTypography section-registration__heading ta-c"
          marginBottom={3}
        >
          Registration Student
        </Typography>
        <ContainerWithShadow className="container--registration">
          {!isSuccessForm ? (
            <RegistrationStudent
              inputFields={['fullname', 'login', 'email', 'password', 'confirm_password']}
              onSuccess={successSignUpForm}
              isLoading={isLoading}
              validationMessage={validationMessage}
            />
          ) : (
            <div className="text-center">
              <span>{validationMessage && validationMessage}</span>
              <Link href="/">
                <a>Ok</a>
              </Link>
            </div>
          )}
        </ContainerWithShadow>
      </PublicLayout>
    </div>
  )
}

export default RegistrationStudentPage
