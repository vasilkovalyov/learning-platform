import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import PublicLayout from 'layouts/PublicLayout'
import { setAuthState } from 'redux/slices/auth'
import { useDispatch } from 'react-redux'
import UserService from 'services/user'
import { IUserStudent } from 'intefaces/user'
import { RoleType } from '../types/common'

import { ICalendarEvent } from '../components/calendar/components/CalendarEvent/CalendarEvent.type'

import Calendar from 'components/calendar/calendar'
import LessonCard from 'components/LessonCard/LessonCard'

const initialProps = {
  props: {
    user: null,
  },
}

const eventsDate: ICalendarEvent[] = [
  {
    id: '1',
    title: 'event 1',
    eventStart: '2022-12-27T13:20:00.083Z',
    eventEnd: '2022-12-27T15:20:00.083Z',
    type: 'personal',
  },
  {
    id: '2',
    title: 'event 2',
    eventStart: '2022-12-28T16:20:00.083Z',
    eventEnd: '2022-12-28T17:20:00.083Z',
    type: 'group',
  },
  {
    id: '3',
    title: 'event 3',
    eventStart: '2022-12-31T09:20:00.083Z',
    eventEnd: '2022-12-31T11:20:00.083Z',
    type: 'group',
  },
]

const Home: NextPage = (props: { user: IUserStudent }) => {
  const dispatch = useDispatch()
  const [events, setEvents] = useState<ICalendarEvent[] | []>(eventsDate)

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
        <Calendar events={events} date={new Date()} />
        <LessonCard
          id={'1'}
          dateTimestamp={'2023-01-01'}
          heading={'Basic Spanish skills'}
          eventStart={'19:03'}
          eventEnd={'20:03'}
          registeredCount={15}
          maxPersons={10}
        />
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
