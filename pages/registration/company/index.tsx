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

import BaseFormStepFirst from 'components/forms/BaseFormStepFirst'
import CompanyStepSecond from 'components/forms/CompanyStepSecond'

const { Title } = Typography

const Company: NextPage = () => {
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
            <Row justify="center" gutter={[40, 40]}>
              <Col span={24} md={14} lg={10} className="d-flex">
                <BaseFormStepFirst />
              </Col>
              <Col span={24} md={14} lg={10} className="d-flex">
                <CompanyStepSecond />
              </Col>
            </Row>
          </div>
        </Layout>
      </PublicLayout>
    </div>
  )
}

export default Company