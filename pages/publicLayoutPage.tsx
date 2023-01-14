import React, { ReactElement } from 'react'
import Head from 'next/head'
import BaseLayout from 'layouts/BaseLayout'

function PublicLayoutPage(page: ReactElement) {
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

export default PublicLayoutPage
