import React, { useEffect } from 'react'
import Typography from 'antd/lib/typography'
import AdminLayout from 'layouts/AdminLayout'
import AccountForm from '../../components/forms/AccountForm'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'

import UserService from 'services/user'
import { useDispatch } from 'react-redux'
import { IUserStudent } from 'intefaces/user'
import { setAuthState, selectAuthState } from 'redux/slices/auth'
import { useSelector } from 'react-redux'

import { useFormAction, IUseFormAction } from '../../hooks/useFormAction'
import { RoleType } from 'types/common'

const { Title } = Typography

const initialProps = {
  props: {
    user: null,
  },
}

const initialStateFormAction: IUseFormAction = {
  isLoading: false,
  validationMessage: '',
}

function Account(props: { user: IUserStudent | null }) {
  const [isLoading, validationMessage] = useFormAction(initialStateFormAction)
  const authState = useSelector(selectAuthState)

  // useEffect(() => {}, [])

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
          role={authState?.role as RoleType}
          formData={authState}
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
  try {
    if (!ctx.req.headers.cookie)
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    const cookies = ctx.req.headers.cookie.split(';')
    let userId: string | null = null
    let token: string | null = null
    let role: RoleType | null = null
    for (let i = 0; i <= cookies.length - 1; i++) {
      if (cookies[i].includes('userId')) {
        userId = cookies[i].split('=')[1]
      }
      if (cookies[i].includes('token')) {
        token = cookies[i].split('=')[1]
      }
      if (cookies[i].includes('role')) {
        role = cookies[i].split('=')[1]
      }
    }

    if (!userId || !role) return initialProps
    const user = await UserService.isAuthUser(role, userId, token || '')
    if (!user) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }
    return {
      props: {
        user: user,
      },
    }
  } catch (e) {
    return initialProps
  }
}
