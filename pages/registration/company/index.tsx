import React from 'react'
import Link from 'next/link'
import type { NextPage } from 'next'
import Head from 'next/head'

import PublicLayout from 'layouts/PublicLayout'

import BaseFormStepFirst, { BaseFormStepFirstType } from 'components/forms/BaseFormStepFirst'
import CompanyStepSecond, { BaseFormCompanyStepSecondType } from 'components/forms/CompanyStepSecond'

import { useFormAction, useFormSteps, IUseFormAction, IUserFormSteps } from '../../../hooks/useFormAction'
import AuthService from '../../../services/auth'

const initialStateFormAction: IUseFormAction = {
  isLoading: false,
  validationMessage: '',
}

const initialStateFormSteps: IUserFormSteps<BaseFormStepFirstType, BaseFormCompanyStepSecondType> = {
  isSuccessForms: false,
  formDataFirst: null,
}

const Company: NextPage = () => {
  const [isLoading, validationMessage, toggleLoading, addValidationMessage] = useFormAction(initialStateFormAction)
  const [isSuccessForm, successForm, setFormStepFirst, setFormStepSecond, formDataFirst, isSuccessFormFirst] =
    useFormSteps<BaseFormStepFirstType, BaseFormCompanyStepSecondType>(initialStateFormSteps)

  function successFormFirst(isSuccess: boolean, data: BaseFormStepFirstType) {
    if (!isSuccess) return
    setFormStepFirst(data)
  }

  async function successFormSecond(isSuccess: boolean, data: BaseFormCompanyStepSecondType) {
    if (!isSuccess) return
    try {
      toggleLoading(true)
      setFormStepSecond(data)
      const userData = { ...formDataFirst, ...data }
      const response = await AuthService.signUpCompany(userData)
      toggleLoading(false)
      addValidationMessage(response.message || '')
      successForm()
    } catch (e) {
      toggleLoading(false)
      // addValidationMessage(e || e.message)
      addValidationMessage(e.message || 'Error')
    }
  }

  return (
    <div>
      <Head>
        <title>LearnLangPlatform - Registration Company</title>
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
              <div>Company</div>
            </div>
          </div>
        </div>
        <div className="section-registration">
          <div className="container">
            <h3 className="section-registration__heading">Registration Company</h3>
            {!isSuccessForm ? (
              <div>
                <div>
                  <BaseFormStepFirst onSuccess={successFormFirst} type="company" />
                </div>
                {isSuccessFormFirst ? (
                  <div>
                    <CompanyStepSecond
                      onSuccess={successFormSecond}
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

export default Company
