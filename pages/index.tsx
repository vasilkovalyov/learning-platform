import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import PublicLayout from 'layouts/PublicLayout'
import { setAuthState } from 'redux/slices/auth'
import { useDispatch } from 'react-redux'
import UserService from 'services/user'
import { IUserStudent } from 'intefaces/user'
import { RoleType } from '../types/common'

import Calendar from 'components/calendar/calendar'

const initialProps = {
  props: {
    user: null,
  },
}

const Home: NextPage = (props: { user: IUserStudent }) => {
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
        <pre>{JSON.stringify(props, null, 4)}</pre>
        <Calendar />
      </PublicLayout>
    </div>
  )
}

export default Home

export async function getServerSideProps(ctx) {
  try {
    if (!ctx.req.headers.cookie) return initialProps

    const cookies = ctx.req.headers.cookie.split(';')
    let userId: string | null = null
    let token: string | null = null
    let role: RoleType | null = null

    for (let i = 0; i <= cookies.length - 1; i++) {
      if (cookies[i].includes('userId')) {
        userId = cookies[i].split('=')[1]
      }
      if (cookies[i].includes('token')) {
        token = cookies[i].split('=')[1]
      }
      if (cookies[i].includes('role')) {
        role = cookies[i].split('=')[1]
      }
    }

    if (!userId || !role) return initialProps
    const user = await UserService.isAuthUser(role, userId, token || '')

    return {
      props: {
        user: user || null,
      },
    }
  } catch (e) {
    console.log(e)
    return initialProps
  }
}
