import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import PublicLayout from 'layouts/PublicLayout'
import { setAuthState } from 'redux/slices/auth'
import { useDispatch } from 'react-redux'
import UserService from 'services/user'
import { IUser } from 'intefaces/user'

const initialProps = {
  props: {
    user: null,
  },
}

const Home: NextPage = (props: { user: IUser }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setAuthState(props.user))
  })

  return (
    <div>
      <Head>
        <title>LearnLangPlatform</title>
        <meta name="description" content="The platform for learning languages" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PublicLayout>
        <h1>Public Layout</h1>
        {JSON.stringify(props)}
      </PublicLayout>
    </div>
  )
}

export default Home

export async function getServerSideProps(ctx) {
  if (!ctx.req.headers.cookie) return initialProps

  const cookies = ctx.req.headers.cookie.split(';')
  let userId: string | null = null
  for (let i = 0; i <= cookies.length - 1; i++) {
    if (cookies[i].includes('userId')) {
      userId = cookies[i].split('=')[1]
    }
  }

  if (!userId) return initialProps

  const user = await UserService.isAuthUser(userId)

  return {
    props: {
      user: user,
    },
  }
}
