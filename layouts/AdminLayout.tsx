import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

import PublicLayout from './BaseLayout'
import { useSelector } from 'react-redux'
import { selectAuthState } from 'redux/slices/auth'

import AdminPageNavigation from '../components/AdminPageNavigation'

function AdminLayout({ children }: { children: React.ReactNode }) {
  const authState = useSelector(selectAuthState)

  return (
    <>
      <Head>
        <title>LearnLangPlatform - Admin</title>
        <meta name="description" content="The platform for learning languages" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PublicLayout>
        <Container>
          <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
            <Link href="/">
              <a className="breadcrumbs__item">Home</a>
            </Link>
            <Typography variant="body2" className="MuiTypography breadcrumbs__item">
              Admin
            </Typography>
          </Breadcrumbs>
          <div className="section-admin">
            <div className="container">
              <Typography marginBottom={3} variant="h2" className="MuiTypography section-admin__heading">
                Personal Area
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={4} md={3}>
                  <Box marginBottom={3}>
                    <Typography variant="body1">{authState?.fullname}</Typography>
                  </Box>
                  {authState ? <AdminPageNavigation role={authState?.role} /> : null}
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <div className="gutter-row">{children}</div>
                </Grid>
              </Grid>
            </div>
          </div>
        </Container>
      </PublicLayout>
    </>
  )
}

export default AdminLayout
