import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import PublicLayout from 'layouts/PublicLayout'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>LearnLangPlatform</title>
        <meta name="description" content="The platform for learning languages" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PublicLayout>
        <h1>Public Layout</h1>
      </PublicLayout>
    </div>
  )
}

export default Home
