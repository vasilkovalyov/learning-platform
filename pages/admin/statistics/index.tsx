import React from 'react'
import Typography from 'antd/lib/typography'
import AdminLayout from 'layouts/AdminLayout'

const { Title } = Typography

const Statistics = () => {
  return (
    <div>
      <Title level={3}>Statistics</Title>
    </div>
  )
}

Statistics.PageLayout = AdminLayout

export default Statistics
