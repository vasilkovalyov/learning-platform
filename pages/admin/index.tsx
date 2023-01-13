import React, { useEffect, useState } from 'react'
import AdminLayout from 'layouts/AdminLayout'

import UserService from 'services/user'
import { useDispatch } from 'react-redux'
import { IUserStudent } from 'interfaces/user'
import { setAuthState, selectAuthState } from 'redux/slices/auth'
import { useSelector } from 'react-redux'

import { RoleType } from 'types/common'

import TeacherService from 'services/teacher.service'
// import { openNotification } from 'common/utilities'

const initialProps = {
  props: {
    user: null,
  },
}

function Account(props: { user: IUserStudent | null }) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [validationMessage, setValidationMessage] = useState<string | null>(null)
  // const [isLoading, validationMessage, toggleLoading] = useFormAction(initialStateFormAction)
  const authState = useSelector(selectAuthState)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setAuthState(props.user))
  })

  function successSaveChanges(isSuccess, data) {
    setIsLoading(true)
    if (authState?.role === 'teacher') {
      TeacherService.saveAccountData({
        ...data,
        _id: authState._id,
      })
        .then((res) => {
          console.log(res)
          setIsLoading(false)
          // openNotification('bottomRight')
        })
        .catch((e) => {
          setValidationMessage(e.response.message)
        })
    }
  }

  return (
    <div>
      <div>
        <h3>Account</h3>
      </div>
    </div>
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
