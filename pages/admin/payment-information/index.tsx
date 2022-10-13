import React from 'react'
import Typography from 'antd/lib/typography'
import AdminLayout from 'layouts/AdminLayout'

const { Title } = Typography

const PaymentInformation = () => {
  return (
    <div>
      <Title level={3}>Payment Information</Title>
    </div>
  )
}

PaymentInformation.PageLayout = AdminLayout

export default PaymentInformation
