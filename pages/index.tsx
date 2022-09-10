import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import axios from 'axios'

const Home: NextPage = () => {
  const [data, setData] = useState<string>('')

  useEffect(() => {
    function loadData() {
      axios.get('http://localhost:9000/api').then((res) => {
        setData(res.data)
      })
    }
    loadData()
  }, [])
  return (
    <div>
      <Head>
        <title>LearnLangPlatform</title>
        <meta name="description" content="The platform for learning languages" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to LearnLangPlatform</h1>
        {data}
      </main>
    </div>
  )
}

export default Home
