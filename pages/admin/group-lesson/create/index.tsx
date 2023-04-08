import React, { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'

import PublicLayout from 'layouts/BaseLayout'

import GroupLesson from 'components/Forms/GroupLesson'
import ShadowContainer from 'components/ShadowContainer'
import StudentsForLesson from 'components/StudentsForLesson'
import { IStudentForLessonProps } from 'components/StudentsForLesson/StudentsForLesson.type'
import { IGroupLessonProps } from 'interfaces/group-lesson.interface'

const GroupLessonCreate: NextPage = () => {
  const [selectedStudents, setSelectedStudents] = useState<IStudentForLessonProps[] | []>([])

  function onChangeStudent(sstudents: IStudentForLessonProps[] | []) {
    setSelectedStudents(sstudents)
  }

  function onSubmit(data: IGroupLessonProps) {
    console.log('data', data)
    if (!selectedStudents.length) {
      alert('You have to add ')
      return
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
              <GroupLesson onSubmit={onSubmit} initialData={null} />
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
      </PublicLayout>
    </div>
  )
}

export default GroupLessonCreate
