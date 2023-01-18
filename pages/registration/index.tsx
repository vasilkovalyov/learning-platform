import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'

import PublicLayout from 'layouts/BaseLayout'

import RegisterCard from 'components/RegisterCard'

const Registration: NextPage = () => {
  return (
    <div>
      <Head>
        <title>LearnLangPlatform - Registration</title>
        <meta name="description" content="The platform for learning languages" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PublicLayout className="page-registration">
        <Container className="container">
          <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
            <Link href="/">
              <a className="breadcrumbs__item">Home</a>
            </Link>
            <Typography variant="body2" className="MuiTypography breadcrumbs__item">
              Registration
            </Typography>
          </Breadcrumbs>
          <Typography
            component="h1"
            variant="h2"
            className="MuiTypography section-registration__heading ta-c"
            marginBottom={3}
          >
            Registration
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={10} md={4}>
              <Link href="/registration/student">
                <a>
                  <RegisterCard title="Student" type="student" />
                </a>
              </Link>
            </Grid>
            <Grid item xs={10} md={4}>
              <Link href="/registration/teacher">
                <a>
                  <RegisterCard title="Teacher" type="teacher" />
                </a>
              </Link>
            </Grid>
          </Grid>
        </Container>
      </PublicLayout>
    </div>
  )
}

export default Registration
