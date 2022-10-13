import React from 'react'
import Typography from 'antd/lib/typography'
import AdminLayout from 'layouts/AdminLayout'

const { Title } = Typography

const MyLessons = () => {
  return (
    <div>
      <Title level={3}>My Lessons</Title>
    </div>
  )
}

MyLessons.PageLayout = AdminLayout

export default MyLessons
