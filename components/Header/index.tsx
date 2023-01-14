import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'

import Icon from 'components/Icon'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { selectAuthState, clearAuthState } from 'redux/slices/auth'

import colors from 'constants/colors'
import pages from 'constants/pages'

function AdminNavList() {
  const router = useRouter()
  const dispatch = useDispatch()

  function signOut() {
    router.push('/')
    dispatch(clearAuthState())
    document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:01 GTM;'
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:01 GTM;'
    document.cookie = 'role=; expires=Thu, 01 Jan 1970 00:00:01 GTM;'
    localStorage.removeItem('userId')
  }

  return (
    <Stack
      direction={'row'}
      spacing={1}
      divider={<Divider orientation="horizontal" flexItem />}
      className="header__auth-list"
    >
      <div className="header__auth-item">
        <Link href={pages.admin}>
          <a className="header__auth-link">Admin</a>
        </Link>
      </div>
      <div className="header__auth-item">
        <div />
      </div>
      <div className="header__auth-item">
        <Button className="header__auth-link" href={pages.home} onClick={() => signOut()}>
          Sign out
        </Button>
      </div>
    </Stack>
  )
}

function PublicNavList() {
  return (
    <Stack
      direction={'row'}
      spacing={1}
      divider={<Divider orientation="horizontal" flexItem />}
      className="header__auth-list"
    >
      <div className="header__auth-item">
        <Icon icon="user" size={20} color={colors.primary_color} className="header__auth-icon" />
        <Link href={pages.login}>
          <a className="header__auth-link">Sign in</a>
        </Link>
      </div>
      <div className="header__auth-item">
        <div>/</div>
      </div>
      <div className="header__auth-item">
        <Link href={pages.registration}>
          <a className="header__auth-link">Sign up</a>
        </Link>
      </div>
    </Stack>
  )
}

function Header() {
  const authState = useSelector(selectAuthState)

  return (
    <div className="header">
      <Container className="container">
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Link href="/">
              <a className="header__logo">LearnPlatform</a>
            </Link>
          </Grid>
          <Grid item xs={8}>
            <div className="header__navigation-auth-buttons">{authState ? <AdminNavList /> : <PublicNavList />}</div>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Header
