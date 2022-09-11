import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import PublicLayout from 'components/layouts/PublicLayout'

const Auth: NextPage = () => {
  return (
    <div>
      <Head>
        <title>LearnLangPlatform - Auth</title>
        <meta name="description" content="The platform for learning languages" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PublicLayout>
        <h1>Auth</h1>
      </PublicLayout>
    </div>
  )
}

export default Auth
