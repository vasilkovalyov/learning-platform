import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

import PublicLayout from './PublicLayout'
import { useSelector } from 'react-redux'
import { selectAuthState } from 'redux/slices/auth'

import AdminPageNavigation from '../components/admin/AdminPageNavigation'

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
            <div>
              <div>
                <Link href="/">
                  <a>Home</a>
                </Link>
              </div>
              <div>Admin page</div>
            </div>
          </div>
        </div>
        <div className="section-admin">
          <div className="container">
            <h3 className="section-admin__heading">
              <span className="section-admin__heading-role">{authState?.role}</span> - Personal Area
            </h3>
            <div>
              <div className="gutter-row">
                <div className="section-admin__avatar-wrapper">
                  <img src="/images/avatar-default.jpg" />
                </div>
                <h4>{authState?.login}</h4>
                <AdminPageNavigation role="student" />
              </div>
              <div className="gutter-row">{children}</div>
            </div>
          </div>
        </div>
      </PublicLayout>
    </div>
  )
}

export default AdminLayout
