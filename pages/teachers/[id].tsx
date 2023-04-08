import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'

import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Grid from '@mui/material/Grid'

import ModalPopupBox from 'components/ModalPopupBox'
import PublicLayout from 'layouts/BaseLayout'
import About from 'blocks/About'

import ShadowContainer from 'components/ShadowContainer'

import userService from 'services/teacher.service'
import { ITeacherProfileInfo } from 'interfaces/teacher.interface'
import BookingPrivateLesson from 'components/BookTeacherLessons/BookingPrivateLesson'
import BookingTestLesson from 'components/BookTeacherLessons/BookingTestLesson'
import Opportunity from 'blocks/Opportunity'
import Resume from 'blocks/Resume'
import ScheduleCalendar from 'modules/Calendar/ScheduleCalendar'

import getFormatDurationTime from 'common/formatDurationTime'

const TeacherProfile: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [userProfile, setUserProfile] = useState<ITeacherProfileInfo | null>(null)

  async function loadUserProfile() {
    try {
      const response = await userService.getUserProfileInfo(id as string)
      console.log(response.data)
      setUserProfile(response.data)
    } catch (e) {
      router.push('/teachers')
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
              <Box mb={3}>
                <ShadowContainer>
                  <About heading="About me" text={userProfile?.privateData.about_info || ''} />
                </ShadowContainer>
              </Box>
              <Box>
                <ShadowContainer>
                  <ScheduleCalendar date={new Date()} />
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
      </PublicLayout>
    </div>
  )
}

export default TeacherProfile
