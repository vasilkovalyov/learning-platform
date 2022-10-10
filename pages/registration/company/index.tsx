import React from 'react'
import Link from 'next/link'
import type { NextPage } from 'next'
import Head from 'next/head'

import PublicLayout from 'components/layouts/PublicLayout'
import Typography from 'antd/lib/typography'
import Layout from 'antd/lib/layout/layout'
import Breadcrumb from 'antd/lib/breadcrumb'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Space from 'antd/lib/space'
import Button from 'antd/lib/button'

import BaseFormStepFirst, { BaseFormStepFirstType } from 'components/forms/BaseFormStepFirst'
import CompanyStepSecond, { BaseFormCompanyStepSecondType } from 'components/forms/CompanyStepSecond'

import { useFormAction, useFormSteps, IUseFormAction, IUserFormSteps } from '../../../hooks/useFormAction'
import AuthService from '../../../services/auth'

const { Title, Text } = Typography

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
      addValidationMessage(e.response.data.message || e.message)
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
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link href="/">
                  <a>Home</a>
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Company</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <Layout className="section-registration">
          <div className="container">
            <Title level={2} className="section-registration__heading">
              Registration Company
            </Title>
            {!isSuccessForm ? (
              <Row justify="center" gutter={[40, 40]}>
                <Col span={24} md={14} lg={10}>
                  <BaseFormStepFirst onSuccess={successFormFirst} />
                </Col>
                {isSuccessFormFirst ? (
                  <Col span={24} md={14} lg={10}>
                    <CompanyStepSecond
                      onSuccess={successFormSecond}
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

export default Company
