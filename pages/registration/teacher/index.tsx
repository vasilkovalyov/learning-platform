import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

import PublicLayout from 'components/layouts/PublicLayout'
import Typography from 'antd/lib/typography'
import Layout from 'antd/lib/layout/layout'
import Breadcrumb from 'antd/lib/breadcrumb'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'

import BaseFormStepFirst from 'components/forms/BaseFormStepFirst'
import TeacherStepSecond from 'components/forms/TeacherStepSecond'
import TeacherStepThird from 'components/forms/TeacherStepThird'

const { Title } = Typography

const RegistrationTeacher: NextPage = () => {
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
                <a href="/">Home</a>
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
            <Row justify="center" gutter={[40, 40]}>
              <Col span={24} md={14} lg={8} className="d-flex">
                <BaseFormStepFirst />
              </Col>
              <Col span={24} md={14} lg={8} className="d-flex">
                <TeacherStepSecond />
              </Col>
              <Col span={24} md={14} lg={8} className="d-flex">
                <TeacherStepThird />
              </Col>
            </Row>
          </div>
        </Layout>
      </PublicLayout>
    </div>
  )
}

export default RegistrationTeacher
