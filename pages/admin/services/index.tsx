import React from 'react'
import Typography from 'antd/lib/typography'
import AdminLayout from 'layouts/AdminLayout'

const { Title } = Typography

const Services = () => {
  return (
    <div>
      <Title level={3}>Services</Title>
    </div>
  )
}

Services.PageLayout = AdminLayout

export default Services
