import React, { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import axios from 'axios'
import PublicLayout from 'components/layouts/PublicLayout'

const Home: NextPage = () => {
  const [data, setData] = useState<string>('')

  function loadData() {
    console.log(document.location.origin)
    axios.get(`${document.location.origin}/api`).then((res) => {
      setData(res.data)
    })
  }

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
