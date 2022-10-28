import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Avatar from 'antd/lib/avatar'
import Typography from 'antd/lib/typography'
import Layout from 'antd/lib/layout/layout'
import Breadcrumb from 'antd/lib/breadcrumb'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'

import PublicLayout from './PublicLayout'
import { useSelector } from 'react-redux'
import { selectAuthState } from 'redux/slices/auth'

import AdminPageNavigation from '../components/admin/AdminPageNavigation'

const { Title } = Typography

function AdminLayout({ children }: { children: React.ReactNode }) {
  const authState = useSelector(selectAuthState)

  return (
    <div>
      <Head>
        <title>LearnLangPlatform - Admin</title>
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
              <Breadcrumb.Item>Admin page</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <Layout className="section-admin">
          <div className="container">
            <Title level={2} className="section-admin__heading">
              Personal Area
            </Title>
            <Row gutter={48}>
              <Col className="gutter-row" span={24} md={8} lg={6}>
                <div className="section-admin__avatar-wrapper">
                  <Avatar size={88} src="/images/avatar-default.jpg" />
                </div>
                <Title level={4}>{authState?.login}</Title>
                <AdminPageNavigation role="student" />
              </Col>
              <Col className="gutter-row" span={24} md={16}>
                {children}
              </Col>
            </Row>
          </div>
        </Layout>
      </PublicLayout>
    </div>
  )
}

export default AdminLayout
