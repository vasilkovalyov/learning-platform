import React, { useState } from 'react'
import type { NextPage } from 'next'
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
import TeacherCard from 'components/TeacherCard'
import { TeacherCardProps } from 'components/TeacherCard/TeacherCard.type'

import ShadowContainer from 'components/ShadowContainer'
import FilterLessons from 'components/FilterLessons'
import { FilterLessonsProps } from 'components/FilterLessons/FilterLessons.type'

import data from './teachers.data'

const Teachers: NextPage = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  function onFilterSubmit(data: FilterLessonsProps) {
    console.log(data)
  }

  function handleCloseModal() {
    setModalOpen(false)
  }

  function onClickTrialLesson(id: string) {
    console.log(id)
    setModalOpen(true)
  }

  return (
    <div>
      <Head>
        <title>LearnLangPlatform - Teachers</title>
        <meta name="description" content="The platform for learning languages" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PublicLayout className="page-teacher">
        <Container className="container">
          <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
            <Link href="/">
              <a className="breadcrumbs__item">Home</a>
            </Link>
            <Typography variant="body2" className="MuiTypography breadcrumbs__item">
              Teachers
            </Typography>
          </Breadcrumbs>
          <Typography
            component="h1"
            variant="h2"
            className="MuiTypography section-registration__heading"
            marginBottom={3}
          >
            Teachers
          </Typography>
          <Box className="page-teacher__body">
            <aside className="page-teacher__aside">
              <ShadowContainer>
                <FilterLessons onSubmit={onFilterSubmit} />
              </ShadowContainer>
            </aside>
            <div className="page-teacher__content">
              <div className="page-teacher__content-grid">
                {data.map((teacherItem: TeacherCardProps) => (
                  <div key={teacherItem.id} className="page-teacher__content-grid-col">
                    <ShadowContainer>
                      <TeacherCard {...teacherItem} onClickTrialLesson={onClickTrialLesson} />
                    </ShadowContainer>
                  </div>
                ))}
              </div>
            </div>
          </Box>
        </Container>
      </PublicLayout>
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <>
          <ModalPopupBox type="full" onHandleClose={handleCloseModal}>
            <Box>
              <Box marginBottom={3}>
                <Typography variant="h2" className="MuiTypography ta-c">
                  Trial Lesson
                </Typography>
              </Box>
              <Grid container spacing={2} justifyContent="center">
                <ShadowContainer className="popup-box">
                  <Button variant="contained" onClick={handleCloseModal}>
                    Book
                  </Button>
                </ShadowContainer>
              </Grid>
            </Box>
          </ModalPopupBox>
        </>
      </Modal>
    </div>
  )
}

export default Teachers
