import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import Icon from 'components/Generic/Icon'
import cn from 'classnames'
import { RoleType } from 'types/common'
import colors from '../../constants/colors'

interface INavigation {
  id: number
  path: string
  name: string
  icon: string
  title: string
  role: RoleType | string
}

function AdminPageNavigation({ role = 'student' }: { role: RoleType }) {
  const router = useRouter()
  const page = router.pathname.split('/')[2] ? router.pathname.split('/')[2] : 'account'
  const [activeNav, setActiveNav] = useState<string>(page)
  const navigation: INavigation[] = [
    {
      id: 1,
      path: '/admin',
      name: 'account',
      title: 'Account',
      icon: 'user',
      role: '',
    },
    {
      id: 2,
      path: '/admin/private-data',
      name: 'private-data',
      title: 'Private data',
      icon: 'private-data',
      role: '',
    },
    {
      id: 3,
      path: '/admin/my-lessons',
      name: 'my-lessons',
      title: 'My lessons',
      icon: 'lessons',
      role: '',
    },
    {
      id: 4,
      path: '/admin/my-teachers',
      name: 'my-teachers',
      title: 'My teachers',
      icon: 'heart-empty',
      role: 'student' as RoleType,
    },
    {
      id: 5,
      path: '/admin/payment-information',
      name: 'payment-information',
      title: 'Payment information',
      icon: 'payment-info',
      role: '',
    },
    {
      id: 6,
      path: '/admin/services',
      name: 'services',
      title: 'Services',
      icon: 'services',
      role: 'teacher' as RoleType,
    },
    {
      id: 7,
      path: '/admin/statistics',
      name: 'statistics',
      title: 'Statistics',
      icon: 'statistics',
      role: '',
    },
    {
      id: 9,
      path: '/admin/chats',
      name: 'chats',
      title: 'Chats',
      icon: 'chats',
      role: '',
    },
  ]

  const getFilteredNav = (): INavigation[] => {
    const updateNav = navigation.filter((navItem) => {
      if (navItem.role === role || navItem.role === '') {
        return navItem as INavigation
      }
    })
    return updateNav
  }

  return (
    <Stack className="admin-page-navigation">
      {getFilteredNav().map((item) => (
        <Link href={item.path} key={item.id}>
          <a
            className={cn('admin-page-navigation__link', {
              'admin-page-navigation__link--active': activeNav === item.name,
            })}
            onClick={() => setActiveNav(item.name)}
          >
            <Icon
              icon={item.icon}
              size={20}
              color={activeNav === item.name ? colors.primary_color : colors.dark_blue_color}
              className="admin-page-navigation__link-icon"
            />
            <Typography className="MuiTypography" variant="body2">
              {item.title}
            </Typography>
          </a>
        </Link>
      ))}
    </Stack>
  )
}

export default AdminPageNavigation
