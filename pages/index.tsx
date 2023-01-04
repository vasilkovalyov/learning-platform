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

// import Calendar from 'components/calendar/calendar'
// import ScheduleCalendar from 'components/calendar/schedule-calendar'
// import LessonsCalendar from 'components/calendar/lessons-calendar'
// import LessonCard from 'components/LessonCard/LessonCard'
import BookingTestLesson from 'components/BookTeacherLessons/BookingTestLesson/BookingTestLesson'
import BookingPrivateLesson from 'components/BookTeacherLessons/BookingPrivateLesson/BookingPrivateLesson'
import AsideComponentContainer from 'components/AsideComponentContainer/AsideComponentContainer'

const initialProps = {
  props: {
    user: null,
  },
}

const eventsDate: ICalendarEvent[] = [
  {
    id: '1',
    title: 'event 1',
    eventStart: '2023-01-02T09:20:00.083Z',
    eventEnd: '2023-01-02T10:20:00.083Z',
    type: 'personal',
  },
  {
    id: '2',
    title: 'event 2',
    eventStart: '2023-01-04T16:20:00.083Z',
    eventEnd: '2023-01-04T17:20:00.083Z',
    type: 'group',
  },
  {
    id: '3',
    title: 'event 3',
    eventStart: '2023-01-12T09:20:00.083Z',
    eventEnd: '2023-01-12T11:20:00.083Z',
    type: 'group',
  },
  {
    id: '4',
    title: 'event 4',
    eventStart: '2023-01-17T17:00:00.083Z',
    eventEnd: '2023-01-17T18:00:00.083Z',
    type: 'course',
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
        {/* <Calendar events={events} date={new Date()} /> */}
        {/* <LessonsCalendar events={events} date={new Date()} /> */}
        {/* <ScheduleCalendar events={events} date={new Date()} /> */}
        {/* <LessonCard
          id={'1'}
          dateTimestamp={'2023-01-01'}
          heading={'Basic Spanish skills'}
          eventStart={'19:03'}
          eventEnd={'20:03'}
          registeredCount={15}
          maxPersons={10}
        /> */}
        <AsideComponentContainer>
          <BookingTestLesson id={'1'} heading={'Test Lesson'} duration={80} price={10} buttonText={'Book Lesson'} />
        </AsideComponentContainer>
        <AsideComponentContainer>
          <BookingPrivateLesson id={'1'} heading={'Private Lesson'} price={10} buttonText={'Book Lesson'} />
        </AsideComponentContainer>
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
