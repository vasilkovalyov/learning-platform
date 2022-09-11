import React, { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import PublicLayout from 'components/layouts/PublicLayout'
import Typography from 'antd/lib/typography'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Layout from 'antd/lib/layout/layout'

import RegisterCard from 'components/client/RegisterCard'

const { Title } = Typography

const Registration: NextPage = () => {
  return (
    <div>
      <Head>
        <title>LearnLangPlatform - Registration</title>
        <meta name="description" content="The platform for learning languages" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PublicLayout>
        <Layout className="section-registration">
          <div className="container">
            <Title level={2} className="section-registration__heading">
              Registration
            </Title>
            <Row align="middle" justify="center" gutter={[40, 40]}>
              <Col xs={24} lg={8}>
                <Link href="/registration/student">
                  <a className="section-registration__card-link">
                    <RegisterCard title="Student" type="student" />
                  </a>
                </Link>
              </Col>
              <Col xs={24} lg={8}>
                <Link href="/registration/teacher">
                  <a className="section-registration__card-link">
                    <RegisterCard title="Teacher" type="teacher" />
                  </a>
                </Link>
              </Col>
              <Col xs={24} lg={8}>
                <Link href="/registration/company">
                  <a className="section-registration__card-link">
                    <RegisterCard title="Company" type="company" />
                  </a>
                </Link>
              </Col>
            </Row>
          </div>
        </Layout>
      </PublicLayout>
    </div>
  )
}

export default Registration
