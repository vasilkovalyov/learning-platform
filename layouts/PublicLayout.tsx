import React from 'react'
import Layout from 'antd/lib/layout'
import { Content } from 'antd/lib/layout/layout'

import Header from '../components/layouts/Header'
import Footer from '../components/layouts/Footer'

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </Layout>
  )
}

export default PublicLayout
