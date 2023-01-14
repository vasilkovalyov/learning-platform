import React, { useState } from 'react'
import Link from 'next/link'
import type { NextPage } from 'next'
import Head from 'next/head'

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
    <div>
      <Head>
        <title>LearnLangPlatform - Registration teacher</title>
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
              <div>Teacher</div>
            </div>
          </div>
        </div>
        <div className="section-registration">
          <div className="container">
            <h3 className="section-registration__heading">Registration Teacher</h3>
            {!isSuccessForm ? (
              <RegistrationTeacherForm
                isLoading={isLoading}
                onSubmit={onSubmit}
                validationMessage={validationMessage}
              />
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
          </div>
        </div>
      </PublicLayout>
    </div>
  )
}

export default RegistrationTeacher
