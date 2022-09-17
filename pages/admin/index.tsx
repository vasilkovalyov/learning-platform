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

import AuthForm from 'components/forms/AuthForm'

const { Title } = Typography

const Admin: NextPage = () => {
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
              <Breadcrumb.Item>Admin</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <Layout className="section-admin">
          <div className="container">
            <Title level={2} className="section-registration__heading">
              Admin page
            </Title>
          </div>
        </Layout>
      </PublicLayout>
    </div>
  )
}

export default Admin
