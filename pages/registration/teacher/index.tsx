import React from 'react'
import Link from 'next/link'
import type { NextPage } from 'next'
import Head from 'next/head'

import PublicLayout from 'layouts/PublicLayout'

import BaseFormStepFirst, { BaseFormStepFirstType } from 'components/forms/BaseFormStepFirst'
import TeacherStepSecond, { IBaseFormTeacherStepSecond } from 'components/forms/TeacherStepSecond'
import TeacherStepThird from 'components/forms/TeacherStepThird'

import { IFormEducation } from '../../../intefaces/auth'

import { useFormAction, useFormSteps, IUseFormAction, IUserFormSteps } from '../../../hooks/useFormAction'
import AuthService from '../../../services/auth'

const initialStateFormAction: IUseFormAction = {
  isLoading: false,
  validationMessage: '',
}

const initialStateFormSteps: IUserFormSteps<BaseFormStepFirstType, IBaseFormTeacherStepSecond> = {
  isSuccessForms: false,
  formDataFirst: null,
  formDataSecond: null,
  isSuccessFormFirst: false,
  isSuccessFormSecond: false,
}

const RegistrationTeacher: NextPage = () => {
  const [isLoading, validationMessage, toggleLoading, addValidationMessage] = useFormAction(initialStateFormAction)
  const [
    isSuccessForm,
    successForm,
    setFormStepFirst,
    setFormStepSecond,
    formDataFirst,
    isSuccessFormFirst,
    formDataSecond,
    isSuccessFormSecond,
  ] = useFormSteps<BaseFormStepFirstType, IBaseFormTeacherStepSecond>(initialStateFormSteps)

  function successFormFirst(isSuccess: boolean, data: BaseFormStepFirstType) {
    if (!isSuccess) return
    setFormStepFirst(data)
  }

  function successFormSecond(isSuccess: boolean, data: IBaseFormTeacherStepSecond) {
    if (!isSuccess) return
    setFormStepSecond(data)
  }

  async function successFormThird(isSuccess: boolean, data: IFormEducation) {
    if (!isSuccess) return
    try {
      toggleLoading(true)
      const userData = { ...formDataFirst, ...formDataSecond, ...data }
      const response = await AuthService.signUpTeacher(userData)
      toggleLoading(false)
      successForm()
      addValidationMessage(response.message || '')
    } catch (e) {
      toggleLoading(false)
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
              <div>
                <div>
                  <BaseFormStepFirst onSuccess={successFormFirst} type="teacher" />
                </div>
                {isSuccessFormFirst ? (
                  <div>
                    <TeacherStepSecond onSuccess={successFormSecond} />
                  </div>
                ) : null}
                {isSuccessFormSecond ? (
                  <div>
                    <TeacherStepThird
                      onSuccess={successFormThird}
                      isLoading={isLoading}
                      validationMessage={validationMessage}
                    />
                  </div>
                ) : null}
              </div>
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
