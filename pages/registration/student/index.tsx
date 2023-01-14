import React, { useState } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'

import PublicLayout from 'layouts/BaseLayout'

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
      <PublicLayout>
        <div className="breadcrumb-block">
          <div className="container">
            <ul>
              <li>
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              <li>Student</li>
            </ul>
          </div>
        </div>
        <div className="section-registration">
          <div className="container">
            <h2 className="section-registration__heading">Registration Student</h2>
            <div>
              <div>
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
              </div>
            </div>
          </div>
        </div>
      </PublicLayout>
    </div>
  )
}

export default RegistrationStudentPage
