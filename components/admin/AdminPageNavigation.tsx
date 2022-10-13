import React, { useState } from 'react'
import Typography from 'antd/lib/typography'
import List from 'antd/lib/list'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Icon from 'components/Icon'
import cn from 'classnames'

const { Title, Text } = Typography

interface INavigation {
  id: number
  path: string
  name: string
  icon: string
  title: string
  role: any
}

export default function AdminPageNavigation() {
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
      role: [],
    },
    {
      id: 2,
      path: '/admin/private-data',
      name: 'private-data',
      title: 'Private data',
      icon: 'private-data',
      role: [],
    },
    {
      id: 3,
      path: '/admin/my-lessons',
      name: 'my-lessons',
      title: 'My lessons',
      icon: 'lessons',
      role: [],
    },
    {
      id: 4,
      path: '/admin/payment-information',
      name: 'payment-information',
      title: 'Payment information',
      icon: 'payment-info',
      role: [],
    },
    {
      id: 5,
      path: '/admin/services',
      name: 'services',
      title: 'Services',
      icon: 'services',
      role: [],
    },
    {
      id: 6,
      path: '/admin/statistics',
      name: 'statistics',
      title: 'Statistics',
      icon: 'statistics',
      role: [],
    },
    {
      id: 7,
      path: '/admin/chats',
      name: 'chats',
      title: 'Chats',
      icon: 'chats',
      role: [],
    },
  ]

  return (
    <div className="admin-page-navigation">
      <List
        className="admin-page-navigation__navigation-list"
        dataSource={navigation}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            className={cn('admin-page-navigation__navigation-item', {
              'admin-page-navigation__navigation-item--active': activeNav === item.name,
            })}
            onClick={() => setActiveNav(item.name)}
          >
            <Link href={item.path}>
              <a className="admin-page-navigation__navigation-link">
                <Icon icon={item.icon} size={20} className="admin-page-navigation__navigation-icon" />
                <Text>{item.title}</Text>
              </a>
            </Link>
          </List.Item>
        )}
      />
    </div>
  )
}
