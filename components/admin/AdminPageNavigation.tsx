import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Icon from 'components/Icon'
import cn from 'classnames'
import { RoleType } from '../../types/common'

interface INavigation {
  id: number
  path: string
  name: string
  icon: string
  title: string
  role: RoleType | string
}

export default function AdminPageNavigation({ role = 'student' }: { role: RoleType }) {
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
    <div className="admin-page-navigation">
      <ul className="admin-page-navigation__navigation-list">
        {getFilteredNav().map((item) => (
          <li
            key={item.id}
            className={cn('admin-page-navigation__navigation-item', {
              'admin-page-navigation__navigation-item--active': activeNav === item.name,
            })}
            onClick={() => setActiveNav(item.name)}
          >
            <Link href={item.path}>
              <a className="admin-page-navigation__navigation-link">
                <Icon icon={item.icon} size={20} className="admin-page-navigation__navigation-icon" />
                <span>{item.title}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
