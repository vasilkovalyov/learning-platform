import React, { MouseEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import logoImage from '../../public/images/logo.png'

import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'

import Icon from 'components/Generic/Icon'
import { useSelector } from 'react-redux'
import { selectAuthState } from 'redux/slices/auth'

import colors from 'constants/colors'
import pages from 'constants/pages'

import { useSignOut } from 'hooks/useSignOut'

const navigationData = [
  {
    path: '/teachers',
    text: 'Teachers',
  },
  {
    path: '/',
    text: 'Group Classes',
  },
  {
    path: '/',
    text: 'Courses',
  },
  {
    path: '/',
    text: 'Companies',
  },
  {
    path: '/',
    text: 'About the project',
  },
  {
    path: '/',
    text: 'Articles',
  },
]

function AdminList() {
  const { signOut } = useSignOut()

  function handleSignOut(e: MouseEvent<HTMLElement>) {
    e.preventDefault()
    signOut()
  }

  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={1}
      className="header__auth-list"
    >
      <Box className="header__auth-list-item">
        <Link href={pages.admin}>
          <a className="header__auth-button font-semibold color-dark-blue-1">Admin</a>
        </Link>
      </Box>
      <Box className="header__auth-list-item">
        <button className="header__auth-button font-semibold color-dark-blue-1" onClick={(e) => handleSignOut(e)}>
          Sign out
        </button>
      </Box>
    </Stack>
  )
}

function AuthList() {
  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={1}
      className="header__auth-list"
    >
      <Box className="header__auth-list-item">
        <Icon icon="user" size={20} color={colors.primary_color} />
        <Link href={pages.login}>
          <a className="header__auth-button font-semibold color-dark-blue-1">Sign in</a>
        </Link>
      </Box>
      <Box className="header__auth-list-item">
        <Link href={pages.registration}>
          <a className="header__auth-button font-semibold color-dark-blue-1">Sign up</a>
        </Link>
      </Box>
    </Stack>
  )
}

function MainNavigation() {
  return (
    <div className="header__nav">
      <Stack direction="row" spacing={2}>
        {navigationData.map((item, index) => (
          <Box key={index} className="header__nav-item">
            <Link href={item.path}>
              <a className="header__nav-link color-dark-blue-1 font-medium">{item.text}</a>
            </Link>
          </Box>
        ))}
      </Stack>
    </div>
  )
}

function Header() {
  const authState = useSelector(selectAuthState)

  return (
    <header className="header">
      <Container className="header__container">
        <Link href="/">
          <a className="header__logo">
            <Image src={logoImage} alt="learn platform" />
          </a>
        </Link>
        <MainNavigation />
        <>{authState.isAuth ? <AdminList /> : <AuthList />}</>
      </Container>
    </header>
  )
}

export default Header
