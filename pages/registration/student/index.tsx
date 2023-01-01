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

import { IFormData } from '../../../intefaces/auth'

import StudentForm from '../../../components/forms/StudentForm'
import Button from 'antd/lib/button'

import AuthService from '../../../services/auth'

import { useFormAction, useFormSteps, IUseFormAction, IUserFormSteps } from '../../../hooks/useFormAction'

const { Title, Text } = Typography

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
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link href="/">
                  <a>Home</a>
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Student</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <Layout className="section-registration">
          <div className="container">
            <Title level={2} className="section-registration__heading">
              Registration Student
            </Title>
            <Row justify="center">
              <Col span={24} md={14} lg={9}>
                {!isSuccessForm ? (
                  <StudentForm
                    onSuccess={successSignUpForm}
                    isLoading={isLoading}
                    validationMessage={validationMessage}
                  />
                ) : (
                  <div className="text-center">
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
              </Col>
            </Row>
          </div>
        </Layout>
      </PublicLayout>
    </div>
  )
}

export default RegistrationStudent
