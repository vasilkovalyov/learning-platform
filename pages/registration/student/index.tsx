import React, { useReducer } from 'react'
import Link from 'next/link'
import type { NextPage } from 'next'
import Head from 'next/head'

import PublicLayout from 'components/layouts/PublicLayout'
import Typography from 'antd/lib/typography'
import Layout from 'antd/lib/layout/layout'
import Breadcrumb from 'antd/lib/breadcrumb'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Space from 'antd/lib/space'

import { IFormData } from '../../../intefaces/auth'

import StudentForm from '../../../components/forms/StudentForm'
import Button from 'antd/lib/button'

import $api from '../../../common/ajax-config'
import { PUBLIC_REQUESTS } from '../../../constants/api-requests'
import { RoleType } from '../../../types/common'

const { Title, Text } = Typography

enum SignUpStudentActionKind {
  SUCCESS_FORM = 'SUCCESS_FORM',
  IS_LOADING = 'IS_LOADING',
  IS_LOADING_SUCCESS = 'IS_LOADING_SUCCESS',
  ERROR_MESSAGE = 'ERROR_MESSAGE',
}

interface SignUpStudentAction {
  type: SignUpStudentActionKind
  payload: ISignUpStudentState
}

interface ISignUpStudentState {
  isLoading: boolean
  isSuccessForm: boolean
  formData: IFormData | null
  validationMessage: string | null
}

const initialState: ISignUpStudentState = {
  isLoading: false,
  isSuccessForm: false,
  formData: null,
  validationMessage: null,
}

function signUpReducer(state: ISignUpStudentState, action: SignUpStudentAction) {
  const { type, payload } = action
  switch (type) {
    case SignUpStudentActionKind.SUCCESS_FORM:
      return {
        ...state,
        isSuccessForm: payload.isSuccessForm,
        formData: payload.formData,
      } as ISignUpStudentState
    case SignUpStudentActionKind.IS_LOADING:
      return {
        ...state,
        isLoading: payload.isLoading,
      } as ISignUpStudentState
    case SignUpStudentActionKind.IS_LOADING_SUCCESS:
      return {
        ...state,
        isLoading: payload.isLoading,
        isSuccessForm: payload.isSuccessForm,
        validationMessage: payload.validationMessage,
      } as ISignUpStudentState
    case SignUpStudentActionKind.ERROR_MESSAGE:
      return {
        ...state,
        isLoading: payload.isLoading,
        validationMessage: payload.validationMessage,
      } as ISignUpStudentState
    default:
      return state
  }
}

const RegistrationStudent: NextPage = () => {
  const [state, dispatch] = useReducer(signUpReducer, initialState)
  const { isLoading, validationMessage, isSuccessForm } = state

  async function successSignUpForm(isSuccess: boolean, data: IFormData) {
    if (!isSuccess) return

    try {
      dispatch({
        type: SignUpStudentActionKind.IS_LOADING,
        payload: {
          isLoading: true,
        } as ISignUpStudentState,
      })
      const response = await $api.post(PUBLIC_REQUESTS.SIGN_UP, {
        params: {
          ...data,
          role: 'student' as RoleType,
        },
      })
      dispatch({
        type: SignUpStudentActionKind.IS_LOADING_SUCCESS,
        payload: {
          isLoading: false,
          isSuccessForm: true,
          validationMessage: response.data.message || null,
        } as ISignUpStudentState,
      })
    } catch (e) {
      console.log(e)
      dispatch({
        type: SignUpStudentActionKind.ERROR_MESSAGE,
        payload: { isLoading: false, validationMessage: e.response.data.message || e.message } as ISignUpStudentState,
      })
    }
  }

  return (
    <div>
      <Head>
        <title>LearnLangPlatform - Registration student</title>
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
              <Breadcrumb.Item>Student</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <Layout className="section-registration">
          <div className="container">
            <Title level={2} className="section-registration__heading">
              Registration Student
            </Title>
            <Row justify="center">
              <Col span={24} md={14} lg={9}>
                {!isSuccessForm ? (
                  <StudentForm
                    onSuccess={successSignUpForm}
                    isLoading={isLoading}
                    validationMessage={validationMessage}
                  />
                ) : (
                  <div className="ta-c">
                    <Space size={[8, 16]} direction="vertical">
                      <Typography>
                        <Text>{validationMessage && validationMessage}</Text>
                      </Typography>
                      <Button type="primary" href="/">
                        Ok
                      </Button>
                    </Space>
                  </div>
                )}
              </Col>
            </Row>
          </div>
        </Layout>
      </PublicLayout>
    </div>
  )
}

export default RegistrationStudent
