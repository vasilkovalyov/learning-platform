import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'

import PublicLayout from 'layouts/BaseLayout'

import ShadowContainer from 'components/ShadowContainer'
import FilterLessons from 'components/FilterLessons'
import { FilterLessonsProps } from 'components/FilterLessons/FilterLessons.type'

const Teachers: NextPage = () => {
  function onFilterSubmit(data: FilterLessonsProps) {
    console.log(data)
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
            <div className="page-teacher__content">content</div>
          </Box>
        </Container>
      </PublicLayout>
    </div>
  )
}

export default Teachers
