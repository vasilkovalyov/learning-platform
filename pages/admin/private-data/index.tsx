import React from 'react'

import StudentPrivateDataForm from '../../../components/forms/StudentPrivateDataForm'
import TeacherPrivateDataForm from '../../../components/forms/TeacherPrivateDataForm'

import AdminLayout from 'layouts/AdminLayout'
import { RoleType } from '../../../types/common'

const PrivateCard = () => {
  const role: RoleType = 'teacher'

  return (
    <div>
      <h3>Private Data</h3>
      {/* {role === 'student' ? <StudentPrivateDataForm /> : null} */}
      {role === 'teacher' ? <TeacherPrivateDataForm /> : null}
    </div>
  )
}

PrivateCard.PageLayout = AdminLayout

export default PrivateCard
