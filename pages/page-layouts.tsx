import React, { ReactElement } from 'react'
import Head from 'next/head'
import AdminLayout from 'layouts/AdminLayout'
import BaseLayout from 'layouts/BaseLayout'

export function PrivateLayout(page: ReactElement) {
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

export function PublicLayout(page: ReactElement) {
  return (
    <>
      <Head>
        <title>LearnLangPlatform</title>
        <meta name="description" content="The platform for learning languages" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BaseLayout>{page}</BaseLayout>
    </>
  )
}
