import React, { ReactElement } from 'react'
import Head from 'next/head'
import AdminLayout from 'layouts/AdminLayout'

function PrivateLayoutPage(page: ReactElement) {
  return (
    <>
      <Head>
        <title>LearnLangPlatform - Admin</title>
        <meta name="description" content="The platform for learning languages" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminLayout>{page}</AdminLayout>
    </>
  )
}

export default PrivateLayoutPage
