import React, { useReducer } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import Head from 'next/head'

import PublicLayout from 'layouts/PublicLayout'
import Typography from 'antd/lib/typography'
import Layout from 'antd/lib/layout/layout'
import Breadcrumb from 'antd/lib/breadcrumb'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'

import AuthForm, { AuthFormData } from 'components/forms/AuthForm'

import $api from '../../common/ajax-config'
import { PUBLIC_REQUESTS } from '../../constants/api-requests'
import { RoleType } from '../../types/common'

const { Title } = Typography

enum SignIpActionKind {
  SUCCESS_FORM = 'SUCCESS_FORM',
  IS_LOADING = 'IS_LOADING',
  IS_LOADING_SUCCESS = 'IS_LOADING_SUCCESS',
  ERROR_MESSAGE = 'ERROR_MESSAGE',
}

interface SignUpCompanyAction {
  type: SignIpActionKind
  payload: ISignInState
}

interface ISignInState {
  isLoading: boolean
  formData: AuthFormData | null
  validationMessage: string | null
}

const initialState: ISignInState = {
  isLoading: false,
  formData: null,
  validationMessage: null,
}

function signInReducer(state: ISignInState, action: SignUpCompanyAction) {
  const { type, payload } = action
  switch (type) {
    case SignIpActionKind.SUCCESS_FORM:
      return {
        ...state,
        formData: payload.formData,
      } as ISignInState
    case SignIpActionKind.IS_LOADING:
      return {
        ...state,
        isLoading: payload.isLoading,
      } as ISignInState
    case SignIpActionKind.IS_LOADING_SUCCESS:
      return {
        ...state,
        isLoading: payload.isLoading,
        validationMessage: payload.validationMessage,
      } as ISignInState
    case SignIpActionKind.ERROR_MESSAGE:
      return {
        ...state,
        isLoading: payload.isLoading,
        validationMessage: payload.validationMessage,
      } as ISignInState
    default:
      return state
  }
}

const Auth: NextPage = () => {
  const [state, dispatch] = useReducer(signInReducer, initialState)
  const { isLoading, validationMessage } = state
  const router = useRouter()

  async function successSignUpForm(isSuccess: boolean, data: AuthFormData) {
    if (!isSuccess) return

    try {
      dispatch({
        type: SignIpActionKind.IS_LOADING,
        payload: {
          isLoading: true,
        } as ISignInState,
      })
      await $api.post(PUBLIC_REQUESTS.SIGN_IN, { params: data })
      router.push('/admin')
      dispatch({
        type: SignIpActionKind.IS_LOADING_SUCCESS,
        payload: {
          isLoading: false,
        } as ISignInState,
      })
    } catch (e) {
      console.log(e.response)
      dispatch({
        type: SignIpActionKind.ERROR_MESSAGE,
        payload: { isLoading: false, validationMessage: e.response.data.message || e.message } as ISignInState,
      })
    }
  }

  return (
    <div>
      <Head>
        <title>LearnLangPlatform - Sign in</title>
        <meta name="description" content="The platform for learning languages" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PublicLayout>
        <div className="breadcrumb-block">
          <div className="container">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link href="/">
                  <a>Home</a>
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Sign in</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <Layout className="section-registration">
          <div className="container">
            <Title level={2} className="section-registration__heading">
              Sign in
            </Title>
            <Row justify="center">
              <Col span={24} md={14} lg={8}>
                <AuthForm onSuccess={successSignUpForm} isLoading={isLoading} validationMessage={validationMessage} />
              </Col>
            </Row>
          </div>
        </Layout>
      </PublicLayout>
    </div>
  )
}

export default Auth
