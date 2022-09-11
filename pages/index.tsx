import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import Head from 'next/head'
import axios from 'axios'

const Home: NextPage = () => {
  const [data, setData] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    function loadData() {
      console.log(document.location.origin)
      axios.get(`${document.location.origin}/api`).then((res) => {
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
        {JSON.stringify(data)}
      </main>
    </div>
  )
}

export default Home
