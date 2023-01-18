import React, { useState } from 'react'
import Link from 'next/link'
import type { NextPage } from 'next'
import Head from 'next/head'

import Container from '@mui/material/Container'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'

import PublicLayout from 'layouts/BaseLayout'

import { RegistrationTeacherFullProps } from 'components/Forms/Registration/RegistrationTeacher/RegistrationTeacher.type'
import RegistrationTeacherForm from 'components/Forms/Registration/RegistrationTeacher'
import RegistrationService from 'services/registration.service'

const RegistrationTeacher: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [validationMessage, setValidationMessage] = useState<string | null>(null)
  const [isSuccessForm, setIsSuccessForm] = useState<boolean>(false)

  function addValidationMessage(value: string) {
    setValidationMessage(value)
  }

  async function onSubmit(data: RegistrationTeacherFullProps) {
    try {
      setIsLoading(true)
      const response = await RegistrationService.signUpTeacher(data)
      setIsLoading(false)
      addValidationMessage(response.message || '')
      setIsSuccessForm(true)
    } catch (e: any) {
      setIsLoading(false)
      addValidationMessage(e.response.data.message || e.message)
    }
  }

  return (
    <>
      <Head>
        <title>LearnLangPlatform - Registration teacher</title>
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
              Teacher
            </Typography>
          </Breadcrumbs>
          <Typography
            component="h1"
            variant="h2"
            className="MuiTypography section-registration__heading ta-c"
            marginBottom={3}
          >
            Registration Teacher
          </Typography>
          {!isSuccessForm ? (
            <RegistrationTeacherForm isLoading={isLoading} onSubmit={onSubmit} validationMessage={validationMessage} />
          ) : (
            <div className="text-center">
              <div>
                <p>
                  <span>{validationMessage && validationMessage}</span>
                </p>
                <Link href="/">
                  <a>Ok</a>
                </Link>
              </div>
            </div>
          )}
        </Container>
      </PublicLayout>
    </>
  )
}

export default RegistrationTeacher
