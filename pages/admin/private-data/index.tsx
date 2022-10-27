import React from 'react'

import { useSelector } from 'react-redux'
import { AppState } from 'redux/store'

import Typography from 'antd/lib/typography'
import AdminLayout from 'layouts/AdminLayout'
const { Title } = Typography

const PrivateCard = () => {
  return (
    <div>
      <Title level={3}>Private Data</Title>
    </div>
  )
}

PrivateCard.PageLayout = AdminLayout

export default PrivateCard
