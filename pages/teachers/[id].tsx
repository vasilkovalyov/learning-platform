import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'

import { useSelector } from 'react-redux'
import { selectAuthState } from 'redux/slices/auth'

import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'

import PublicLayout from 'layouts/BaseLayout'
import About from 'blocks/About'

import ShadowContainer from 'components/ShadowContainer'
import Notification from 'components/Notification'

import teacherService from 'services/teacher.service'
import studentService from 'services/student.service'

import { ITeacherProfileInfo } from 'interfaces/teacher.interface'
import BookingPrivateLesson from 'components/BookTeacherLessons/BookingPrivateLesson'
import BookingTestLesson from 'components/BookTeacherLessons/BookingTestLesson'
import Opportunity from 'blocks/Opportunity'
import Resume from 'blocks/Resume'
import TeacherProfile from 'blocks/TeacherProfile'

import ScheduleCalendar from 'modules/Calendar/ScheduleCalendar'
import { CalendarEventType } from 'modules/Calendar/utilities/types'
import parseLessonEvents from 'common/parseGroupLessonEvents'

import { getExperienceYearBasedOnWork, getCurrentTime } from 'common/utilities'

const TeacherProfilePage: NextPage = () => {
  const router = useRouter()
  const authState = useSelector(selectAuthState)
  const { id } = router.query
  const [userProfile, setUserProfile] = useState<ITeacherProfileInfo | null>(null)
  const [events, setEvents] = useState<CalendarEventType[] | []>([])

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showNotificaton, setShowNotificaton] = useState<boolean>(false)

  async function loadUserProfile() {
    try {
      const response = await teacherService.getUserProfileInfo(id as string)
      setUserProfile(response.data)

      if (response.data.groupLessons.length) {
        setEvents(parseLessonEvents(response.data.groupLessons, 'group'))
      }
    } catch (e) {
      console.log('e', e)
    }
  }

  async function onHandleAddLesson(lessonId: string) {
    if (!authState.isAuth) router.push('/login')
    setIsLoading(true)

    try {
      const response = await studentService.addToGroupLesson(authState.user._id, lessonId)
      if (response.status === 200) {
        setIsLoading(false)
        setShowNotificaton(true)
      }
    } catch (e) {
      console.log(e)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadUserProfile()
  }, [])

  return (
    <div>
      <Head>
        <title>LearnLangPlatform - Teacher {userProfile?.fullname}</title>
        <meta name="description" content="The platform for learning languages" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PublicLayout className="page-teacher-profile">
        <Container className="container">
          <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
            <Link href="/">
              <a className="breadcrumbs__item">Home</a>
            </Link>
            <Link href="/teachers">
              <a className="breadcrumbs__item">Teachers</a>
            </Link>
            <Typography variant="body2" className="MuiTypography breadcrumbs__item">
              {userProfile?.fullname}
            </Typography>
          </Breadcrumbs>
          <Box className="page-teacher-profile__body">
            <Box className="page-teacher-profile__content">
              {userProfile ? (
                <Box mb={3}>
                  <ShadowContainer>
                    <TeacherProfile
                      fullname={userProfile.fullname || ''}
                      time={getCurrentTime()}
                      experience={getExperienceYearBasedOnWork(userProfile.privateData.work_experience)}
                      country={userProfile.privateData.country}
                      lang_speaking={userProfile.services.lang_speaking}
                      lang_teaching={userProfile.services.lang_teaching}
                      countOfLessons={0}
                      countOfStudents={0}
                      hasShadow={true}
                    />
                  </ShadowContainer>
                </Box>
              ) : null}
              <Box mb={3}>
                <ShadowContainer>
                  <About heading="About me" text={userProfile?.privateData.about_info || ''} />
                </ShadowContainer>
              </Box>
              <Box mb={3}>
                <ShadowContainer>
                  <Typography marginBottom={3} variant="h4" className="MuiTypography font-bold">
                    Schedule
                  </Typography>
                  <ScheduleCalendar
                    date={new Date()}
                    events={events}
                    onHandleAddLesson={onHandleAddLesson}
                    isLoading={isLoading}
                  />
                </ShadowContainer>
              </Box>
              {userProfile ? (
                <Box mb={3}>
                  <ShadowContainer>
                    <Opportunity
                      heading="Teacher opportunity"
                      opportunities={[
                        {
                          heading: 'Lang speaking',
                          items: userProfile?.services.lang_speaking,
                        },
                        {
                          heading: 'Lang teaching',
                          items: userProfile?.services.lang_teaching,
                        },
                        {
                          heading: 'Subjects',
                          items: userProfile?.services.subjects,
                        },
                        {
                          heading: 'Students ages',
                          items: userProfile?.services.students_ages,
                        },
                      ]}
                    />
                  </ShadowContainer>
                </Box>
              ) : null}
              {userProfile ? (
                <Box mb={3}>
                  <ShadowContainer>
                    <Resume
                      heading="Teacher Resume"
                      educations={userProfile?.privateData.education}
                      work_experiences={userProfile?.privateData.work_experience}
                    />
                  </ShadowContainer>
                </Box>
              ) : null}
            </Box>
            <aside className="page-teacher-profile__aside">
              {userProfile?.services.lessons_prices.length ? (
                <Box mb={3}>
                  <ShadowContainer>
                    <BookingTestLesson
                      id={userProfile?._id || ''}
                      heading="Test lesson"
                      duration={userProfile?.services.lesson_duration || 0}
                      price={parseInt(userProfile?.services.lessons_prices[0].price)}
                      buttonText="Book lesson"
                    />
                  </ShadowContainer>
                </Box>
              ) : null}
              {userProfile?.services.lessons_prices.length ? (
                <Box mb={3}>
                  <ShadowContainer>
                    <BookingPrivateLesson
                      id={userProfile?._id || ''}
                      heading="Private Lesson"
                      price={parseInt(userProfile?.services.lessons_prices[0].price)}
                      buttonText="Book lesson"
                      lessonDays={userProfile?.services.lessons_prices.map((item) => +item.count)}
                    />
                  </ShadowContainer>
                </Box>
              ) : null}
            </aside>
          </Box>
        </Container>
        <Notification
          open={showNotificaton}
          setClose={() => setShowNotificaton(false)}
          direction={{ horizontal: 'right', vertical: 'bottom' }}
        >
          You added group lesson success
        </Notification>
      </PublicLayout>
    </div>
  )
}

export default TeacherProfilePage
