import React, { useEffect } from 'react'
import Typography from 'antd/lib/typography'
import AdminLayout from 'layouts/AdminLayout'
import AccountForm from '../../components/forms/AccountForm'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'

import UserService from 'services/user'
import { useDispatch } from 'react-redux'
import { IUser } from 'intefaces/user'
import { setAuthState } from 'redux/slices/auth'

import { useFormAction, IUseFormAction } from '../../hooks/useFormAction'

const { Title } = Typography

const initialStateFormAction: IUseFormAction = {
  isLoading: false,
  validationMessage: '',
}

function Account(props: { user: IUser }) {
  const [isLoading, validationMessage] = useFormAction(initialStateFormAction)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setAuthState(props.user))
  })

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

export async function getServerSideProps(ctx) {
  const cookies = ctx.req.headers.cookie.split(';')
  let userId: string | null = null
  for (let i = 0; i <= cookies.length - 1; i++) {
    if (cookies[i].includes('userId')) {
      userId = cookies[i].split('=')[1]
    }
  }

  if (!userId) {
    return {
      props: {
        user: null,
      },
    }
  }

  const user = await UserService.isAuthUser(userId)

  return {
    props: {
      user: user,
    },
  }
}
