import React from 'react'
import Typography from 'antd/lib/typography'
import AdminLayout from 'layouts/AdminLayout'
const { Title } = Typography

const PrivateCard = () => {
  return (
    <div>
      <Title level={3}>Private Card</Title>
    </div>
  )
}

PrivateCard.PageLayout = AdminLayout

export default PrivateCard
