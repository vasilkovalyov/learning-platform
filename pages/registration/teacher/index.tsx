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
import Button from 'antd/lib/button'

import BaseFormStepFirst, { IBaseFormStepFirst } from 'components/forms/BaseFormStepFirst'
import TeacherStepSecond, { IBaseFormStepSecond } from 'components/forms/TeacherStepSecond'
import TeacherStepThird, { IBaseFormStepThird } from 'components/forms/TeacherStepThird'

import { PUBLIC_REQUESTS } from '../../../constants/api-requests'
import { RoleType } from '../../../types/common'
import $api from '../../../common/ajax-config'

const { Title, Text } = Typography

enum SignUpTeacherActionKind {
  SUCCESS_FORM_FIRST = 'SUCCESS_FORM_FIRST',
  SUCCESS_FORM_SECOND = 'SUCCESS_FORM_SECOND',
  IS_LOADING = 'IS_LOADING',
  IS_LOADING_SUCCESS = 'IS_LOADING_SUCCESS',
  ERROR_MESSAGE = 'ERROR_MESSAGE',
}

interface SignUpTeacherAction {
  type: SignUpTeacherActionKind
  payload: ISignUpTeacherState
}

interface ISignUpTeacherState {
  isLoading: boolean
  isSuccessFormFirst: boolean
  isSuccessFormSecond: boolean
  isSuccessForms: boolean
  formDataFirst: IBaseFormStepFirst | null
  formDataSecond: IBaseFormStepSecond | null
  validationMessage: string | null
}

const initialState: ISignUpTeacherState = {
  isLoading: false,
  isSuccessFormFirst: false,
  isSuccessFormSecond: false,
  isSuccessForms: false,
  formDataFirst: null,
  formDataSecond: null,
  validationMessage: null,
}

function signUpReducer(state: ISignUpTeacherState, action: SignUpTeacherAction) {
  const { type, payload } = action
  switch (type) {
    case SignUpTeacherActionKind.SUCCESS_FORM_FIRST:
      return {
        ...state,
        isSuccessFormFirst: payload.isSuccessFormFirst,
        formDataFirst: payload.formDataFirst,
      } as ISignUpTeacherState
    case SignUpTeacherActionKind.SUCCESS_FORM_SECOND:
      return {
        ...state,
        isSuccessFormSecond: payload.isSuccessFormSecond,
        formDataSecond: payload.formDataSecond,
      } as ISignUpTeacherState
    case SignUpTeacherActionKind.IS_LOADING:
      return {
        ...state,
        isLoading: payload.isLoading,
      } as ISignUpTeacherState
    case SignUpTeacherActionKind.IS_LOADING_SUCCESS:
      return {
        ...state,
        isLoading: payload.isLoading,
        isSuccessForms: payload.isSuccessForms,
        validationMessage: payload.validationMessage,
      } as ISignUpTeacherState
    case SignUpTeacherActionKind.ERROR_MESSAGE:
      return {
        ...state,
        isLoading: payload.isLoading,
        validationMessage: payload.validationMessage,
      } as ISignUpTeacherState
    default:
      return state
  }
}

const RegistrationTeacher: NextPage = () => {
  const [state, dispatch] = useReducer(signUpReducer, initialState)
  const {
    isSuccessFormFirst,
    isSuccessFormSecond,
    isLoading,
    formDataFirst,
    formDataSecond,
    validationMessage,
    isSuccessForms,
  } = state

  function successFormFirst(isSuccess: boolean, data: IBaseFormStepFirst) {
    if (!isSuccess) return
    dispatch({
      type: SignUpTeacherActionKind.SUCCESS_FORM_FIRST,
      payload: {
        isSuccessFormFirst: isSuccess,
        formDataFirst: data,
      } as ISignUpTeacherState,
    })
  }

  function successFormSecond(isSuccess: boolean, data: IBaseFormStepSecond) {
    if (!isSuccess) return
    dispatch({
      type: SignUpTeacherActionKind.SUCCESS_FORM_SECOND,
      payload: {
        isSuccessFormSecond: isSuccess,
        formDataSecond: data,
      } as ISignUpTeacherState,
    })
  }

  async function successFormThird(isSuccess: boolean, data: IBaseFormStepThird) {
    if (!isSuccess) return
    try {
      dispatch({
        type: SignUpTeacherActionKind.IS_LOADING,
        payload: {
          isLoading: true,
        } as ISignUpTeacherState,
      })
      const userData = { ...formDataFirst, ...formDataSecond, ...data, role: 'teacher' as RoleType }
      const response = await $api.post(PUBLIC_REQUESTS.SIGN_UP, { params: userData })

      dispatch({
        type: SignUpTeacherActionKind.IS_LOADING_SUCCESS,
        payload: {
          isLoading: false,
          isSuccessForms: true,
          validationMessage: response.data.message || null,
        } as ISignUpTeacherState,
      })
    } catch (e) {
      dispatch({
        type: SignUpTeacherActionKind.ERROR_MESSAGE,
        payload: { isLoading: false, validationMessage: e.response.data.message || e.message } as ISignUpTeacherState,
      })
    }
  }

  return (
    <div>
      <Head>
        <title>LearnLangPlatform - Registration teacher</title>
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
              <Breadcrumb.Item>Teacher</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <Layout className="section-registration">
          <div className="container">
            <Title level={2} className="section-registration__heading">
              Registration Teacher
            </Title>
            {!isSuccessForms ? (
              <Row justify="center" gutter={[40, 40]}>
                <Col span={24} md={14} lg={8}>
                  <BaseFormStepFirst onSuccess={successFormFirst} />
                </Col>
                {isSuccessFormFirst ? (
                  <Col span={24} md={14} lg={8}>
                    <TeacherStepSecond onSuccess={successFormSecond} />
                  </Col>
                ) : null}
                {isSuccessFormSecond ? (
                  <Col span={24} md={14} lg={8}>
                    <TeacherStepThird
                      onSuccess={successFormThird}
                      isLoading={isLoading}
                      validationMessage={validationMessage}
                    />
                  </Col>
                ) : null}
              </Row>
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
          </div>
        </Layout>
      </PublicLayout>
    </div>
  )
}

export default RegistrationTeacher
