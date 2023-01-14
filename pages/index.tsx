import React, { ReactElement } from 'react'
import Head from 'next/head'
import PublicLayout from 'layouts/BaseLayout'

import type { NextPageWithLayout } from './_app'

const Home: NextPageWithLayout = () => {
  return <div>home layout</div>
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Head>
        <title>LearnLangPlatform</title>
        <meta name="description" content="The platform for learning languages" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PublicLayout>{page}</PublicLayout>
    </>
  )
}

export default Home

// export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
//   console.log('store', store)

//   return {
//     props: {},
//   }
// })
