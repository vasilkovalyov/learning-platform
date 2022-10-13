import React from 'react'
import Typography from 'antd/lib/typography'
import AdminLayout from 'layouts/AdminLayout'

const { Title } = Typography

const Chats = () => {
  return (
    <div>
      <Title level={3}>Chats</Title>
    </div>
  )
}

Chats.PageLayout = AdminLayout

export default Chats
