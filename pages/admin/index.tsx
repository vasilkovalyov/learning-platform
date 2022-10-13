import React from 'react'
import Typography from 'antd/lib/typography'
import AdminLayout from 'layouts/AdminLayout'

const { Title } = Typography

const Account = () => {
  return (
    <div>
      <Title level={3}>Account</Title>
    </div>
  )
}

Account.PageLayout = AdminLayout

export default Account
