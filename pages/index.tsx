import React, { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import PublicLayout from 'components/layouts/PublicLayout'
// import $api from 'common/ajax-config'
// import { PUBLIC_REQUESTS } from '../constants/api-requests'

const Home: NextPage = () => {
  const [data, setData] = useState<string>('')

  // async function loadData() {
  //   console.log(document.location.origin)
  //   const response = await $api.get(PUBLIC_REQUESTS.BASE)
  //   console.log(response)
  // }
  // loadData()
  return (
    <div>
      <Head>
        <title>LearnLangPlatform</title>
        <meta name="description" content="The platform for learning languages" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PublicLayout>
        <h1>Public Layout</h1>
        {/* {JSON.stringify(data)} */}
      </PublicLayout>
    </div>
  )
}

export default Home
