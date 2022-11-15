import React from 'react'

import StudentPrivateDataForm from '../../../components/forms/StudentPrivateDataForm'
import TeacherPrivateDataForm from '../../../components/forms/TeacherPrivateDataForm'

import Typography from 'antd/lib/typography'
import AdminLayout from 'layouts/AdminLayout'
import { RoleType } from '../../../types/common'

const { Title } = Typography

const PrivateCard = () => {
  const role: RoleType = 'teacher'

  return (
    <div>
      <Title level={3}>Private Data</Title>
      {/* {role === 'student' ? <StudentPrivateDataForm /> : null} */}
      {role === 'teacher' ? <TeacherPrivateDataForm /> : null}
    </div>
  )
}

PrivateCard.PageLayout = AdminLayout

export default PrivateCard
