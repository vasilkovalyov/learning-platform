import React, { useState } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'

import PublicLayout from 'layouts/BaseLayout'
import ContainerWithShadow from 'components/Generic/ContainerWithShadow'

import RegistrationStudent from 'components/Forms/Registration/RegistrationStudent'
import { RegistrationStudentFormData } from 'components/Forms/Registration/RegistrationStudent/RegistrationStudent.type'

import RegistrationService from 'services/registration.service'

const RegistrationStudentPage: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [validationMessage, setValidationMessage] = useState<string | null>(null)
  const [isSuccessForm, setIsSuccessForm] = useState<boolean>(false)

  function addValidationMessage(value: string) {
    setValidationMessage(value)
  }

  async function successSignUpForm(data: RegistrationStudentFormData) {
    try {
      setIsLoading(true)
      const response = await RegistrationService.signUpStudent(data)
      console.log(response, 'response')
      setIsLoading(false)
      addValidationMessage(response?.data.message || '')
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
              onSuccess={successSignUpForm}
              isLoading={isLoading}
              validationMessage={validationMessage}
            />
          ) : (
            <Box justifyContent="center">
              <Typography variant="body1" className="MuiTypography ta-c">
                {validationMessage && validationMessage}
              </Typography>
              <Box marginTop={2} className="ta-c">
                <Button href="/" variant="contained">
                  <a>Ok</a>
                </Button>
              </Box>
            </Box>
          )}
        </ContainerWithShadow>
      </PublicLayout>
    </div>
  )
}

export default RegistrationStudentPage
