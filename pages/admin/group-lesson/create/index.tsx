import React, { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { selectAuthState, setUpdateAccountUser } from 'redux/slices/auth'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import Notification from 'components/Notification'

import PublicLayout from 'layouts/BaseLayout'

import GroupLesson from 'components/Forms/GroupLesson'
import ShadowContainer from 'components/ShadowContainer'
import StudentsForLesson from 'components/StudentsForLesson'
import { IStudentForLessonProps } from 'components/StudentsForLesson/StudentsForLesson.type'

import groupLessonService from 'services/group-lesson.service'
import { PRIVATE_REQUESTS } from 'constants/api-requests'
import { IGroupLessonFormDataProps } from 'components/Forms/GroupLesson/GroupLesson.type'

const GroupLessonCreate: NextPage = () => {
  const authState = useSelector(selectAuthState)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showNotificaton, setShowNotificaton] = useState<boolean>(false)
  const [responseMessage, setResponseMessage] = useState<string | null>(null)

  const [selectedStudents, setSelectedStudents] = useState<IStudentForLessonProps[] | []>([])

  function onChangeStudent(sstudents: IStudentForLessonProps[] | []) {
    setSelectedStudents(sstudents)
  }

  async function onSubmit(data: IGroupLessonFormDataProps) {
    setIsLoading(true)
    try {
      const response = await groupLessonService.createGroupLesson(PRIVATE_REQUESTS.TEACHER.CREATE_GROUP_LESSON, {
        ...data,
        teacher: authState.user._id,
      })
      setResponseMessage(response.data.message)
      setResponseMessage(response.data.message)
      setIsLoading(false)
      setShowNotificaton(true)
    } catch (e) {
      setIsLoading(false)
    }
  }
  return (
    <div>
      <Head>
        <title>LearnLangPlatform - Group Lesson Create</title>
        <meta name="description" content="The platform for learning languages" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PublicLayout className="page-group-lesson">
        <Container className="container">
          <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
            <Link href="/">
              <a className="breadcrumbs__item">Home</a>
            </Link>
            <Typography variant="body2" className="MuiTypography breadcrumbs__item">
              Create group lesson
            </Typography>
          </Breadcrumbs>
          <Typography
            component="h1"
            variant="h2"
            className="MuiTypography section-registration__heading"
            marginBottom={3}
          >
            Create group lesson
          </Typography>
          <Box className="page-group-lesson__body">
            <Box className="page-group-lesson__left">
              <GroupLesson onSubmit={onSubmit} initialData={null} isLoading={isLoading} />
            </Box>
            <aside className="page-group-lesson__right">
              <ShadowContainer>
                <StudentsForLesson
                  message="This will display a list of students who have paid and registered for the lesson. You can also send an invitation yourself by entering the full name of a specific person and clicking on the plus sign."
                  students={[
                    {
                      _id: '1',
                      fullname: 'name surname 1',
                    },
                    {
                      _id: '2',
                      fullname: 'name surname 2',
                    },
                    {
                      _id: '3',
                      fullname: 'name surname 3',
                    },
                    {
                      _id: '4',
                      fullname: 'name surname 4',
                    },
                  ]}
                  onChangeStudent={onChangeStudent}
                />
              </ShadowContainer>
            </aside>
          </Box>
        </Container>
        <Notification
          open={showNotificaton}
          setClose={() => setShowNotificaton(false)}
          direction={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {responseMessage}
        </Notification>
      </PublicLayout>
    </div>
  )
}

export default GroupLessonCreate
