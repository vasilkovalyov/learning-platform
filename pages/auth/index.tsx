import React from 'react'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import Head from 'next/head'
import Cookies from 'js-cookie'

import PublicLayout from 'layouts/PublicLayout'
import Typography from 'antd/lib/typography'
import Layout from 'antd/lib/layout/layout'
import Breadcrumb from 'antd/lib/breadcrumb'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'

import AuthService from 'services/auth'
import AuthForm, { AuthFormData } from 'components/forms/AuthForm'
import { useFormAction, IUseFormAction } from 'hooks/useFormAction'
import { setAuthState } from 'redux/slices/auth'

const { Title } = Typography

const initialStateFormAction: IUseFormAction = {
  isLoading: false,
  validationMessage: '',
}

const Auth: NextPage = () => {
  const [isLoading, validationMessage, toggleLoading, addValidationMessage] = useFormAction(initialStateFormAction)
  const router = useRouter()
  const dispatch = useDispatch()

  async function successSignUpForm(isSuccess: boolean, data: AuthFormData) {
    if (!isSuccess) return

    try {
      toggleLoading(true)
      const response = await AuthService.signIn(data)
      Cookies.set('token', response.token)
      Cookies.set('userId', response.data._id)
      dispatch(setAuthState(response.data))
      router.push('/admin')
    } catch (e) {
      console.log(e)
      toggleLoading(false)
      addValidationMessage(e.response.data.message || e.message)
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
