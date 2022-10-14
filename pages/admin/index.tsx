import React from 'react'
import Typography from 'antd/lib/typography'
import AdminLayout from 'layouts/AdminLayout'
import AccountForm from '../../components/forms/AccountForm'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'

import { useFormAction, useFormSteps, IUseFormAction, IUserFormSteps } from '../../hooks/useFormAction'

const { Title } = Typography

const initialStateFormAction: IUseFormAction = {
  isLoading: false,
  validationMessage: '',
}

function Account() {
  const [isLoading, validationMessage, toggleLoading, addValidationMessage] = useFormAction(initialStateFormAction)

  function successSaveChanges() {
    console.log('1')
  }

  return (
    <Row>
      <Col span={24}>
        <Title level={3}>Account</Title>
        <AccountForm
          role={'student'}
          onSuccess={successSaveChanges}
          isLoading={isLoading}
          validationMessage={validationMessage}
        />
      </Col>
    </Row>
  )
}

Account.PageLayout = AdminLayout

export default Account
