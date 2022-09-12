import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

import PublicLayout from 'components/layouts/PublicLayout'
import Typography from 'antd/lib/typography'
import Layout from 'antd/lib/layout/layout'
import Breadcrumb from 'antd/lib/breadcrumb'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Space from 'antd/lib/space'

import StudentForm from '../../../components/forms/StudentForm'
import Button from 'antd/lib/button'

const { Title, Text } = Typography

const RegistrationStudent: NextPage = () => {
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
                <a href="/">Home</a>
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
                <StudentForm />
                {/* <div className="ta-c">
                  <Space size={[8, 16]} direction="vertical">
                    <Typography>
                      <Text>We sent message on your email address!</Text>
                    </Typography>
                    <Button type="primary">Ok</Button>
                  </Space>
                </div> */}
              </Col>
            </Row>
          </div>
        </Layout>
      </PublicLayout>
    </div>
  )
}

export default RegistrationStudent
