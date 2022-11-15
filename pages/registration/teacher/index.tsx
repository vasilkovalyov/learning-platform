import React from 'react'
import Link from 'next/link'
import type { NextPage } from 'next'
import Head from 'next/head'

import PublicLayout from 'layouts/PublicLayout'
import Typography from 'antd/lib/typography'
import Layout from 'antd/lib/layout/layout'
import Breadcrumb from 'antd/lib/breadcrumb'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Space from 'antd/lib/space'
import Button from 'antd/lib/button'

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

const { Title, Text } = Typography

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
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link href="/">
                  <a>Home</a>
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Teacher</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <Layout className="section-registration">
          <div className="container">
            <Title level={2} className="section-registration__heading">
              Registration Teacher
            </Title>
            {!isSuccessForm ? (
              <Row justify="center" gutter={[40, 40]}>
                <Col span={24} md={14} lg={8}>
                  <BaseFormStepFirst onSuccess={successFormFirst} type="teacher" />
                </Col>
                {isSuccessFormFirst ? (
                  <Col span={24} md={14} lg={8}>
                    <TeacherStepSecond onSuccess={successFormSecond} />
                  </Col>
                ) : null}
                {isSuccessFormSecond ? (
                  <Col span={24} md={14} lg={8}>
                    <TeacherStepThird
                      onSuccess={successFormThird}
                      isLoading={isLoading}
                      validationMessage={validationMessage}
                    />
                  </Col>
                ) : null}
              </Row>
            ) : (
              <div className="ta-c">
                <Space size={[8, 16]} direction="vertical">
                  <Typography>
                    <Text>{validationMessage && validationMessage}</Text>
                  </Typography>
                  <Button type="primary" href="/">
                    Ok
                  </Button>
                </Space>
              </div>
            )}
          </div>
        </Layout>
      </PublicLayout>
    </div>
  )
}

export default RegistrationTeacher
