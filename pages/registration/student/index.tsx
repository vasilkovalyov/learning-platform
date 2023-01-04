import React from 'react'
import Link from 'next/link'
import type { NextPage } from 'next'
import Head from 'next/head'

import PublicLayout from 'layouts/PublicLayout'
import { IFormData } from '../../../intefaces/auth'

import StudentForm from '../../../components/forms/StudentForm'

import AuthService from '../../../services/auth'

import { useFormAction, useFormSteps, IUseFormAction, IUserFormSteps } from '../../../hooks/useFormAction'

const initialStateFormAction: IUseFormAction = {
  isLoading: false,
  validationMessage: '',
}

const initialStateFormSteps: IUserFormSteps<IFormData, null> = {
  isSuccessForms: false,
  formDataFirst: null,
}

const RegistrationStudent: NextPage = () => {
  const [isLoading, validationMessage, toggleLoading, addValidationMessage] = useFormAction(initialStateFormAction)
  const [isSuccessForm, successForm] = useFormSteps<IFormData, null>(initialStateFormSteps)
  async function successSignUpForm(isSuccess: boolean, data: IFormData) {
    if (!isSuccess) return

    try {
      toggleLoading(true)
      const response = await AuthService.signUpStudent(data)
      toggleLoading(false)
      addValidationMessage(response.message || '')
      successForm()
    } catch (e) {
      toggleLoading(false)
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
                  <StudentForm
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

export default RegistrationStudent
