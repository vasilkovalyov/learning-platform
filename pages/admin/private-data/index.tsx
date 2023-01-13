import React from 'react'

import AdminLayout from 'layouts/AdminLayout'
import { RoleType } from '../../../types/common'

const PrivateCard = () => {
  const role: RoleType = 'teacher'

  return (
    <div>
      <h3>Private Data</h3>
    </div>
  )
}

PrivateCard.PageLayout = AdminLayout

export default PrivateCard
