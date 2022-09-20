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
import CompanyStepSecond, { IBaseFormStepSecond } from 'components/forms/CompanyStepSecond'

import { PUBLIC_REQUESTS } from '../../../constants/api-requests'
import { RoleType } from '../../../types/common'
import $api from '../../../common/ajax-config'

const { Title, Text } = Typography

enum SignUpCompanyActionKind {
  SUCCESS_FORM_FIRST = 'SUCCESS_FORM_FIRST',
  IS_LOADING = 'IS_LOADING',
  IS_LOADING_SUCCESS = 'IS_LOADING_SUCCESS',
  ERROR_MESSAGE = 'ERROR_MESSAGE',
}

interface SignUpCompanyAction {
  type: SignUpCompanyActionKind
  payload: ISignUpCompanyState
}

interface ISignUpCompanyState {
  isLoading: boolean
  isSuccessFormFirst: boolean
  isSuccessForms: boolean
  formDataFirst: IBaseFormStepFirst | null
  validationMessage: string | null
}

const initialState: ISignUpCompanyState = {
  isLoading: false,
  isSuccessFormFirst: false,
  isSuccessForms: false,
  formDataFirst: null,
  validationMessage: null,
}

function signUpReducer(state: ISignUpCompanyState, action: SignUpCompanyAction) {
  const { type, payload } = action
  switch (type) {
    case SignUpCompanyActionKind.SUCCESS_FORM_FIRST:
      return {
        ...state,
        isSuccessFormFirst: payload.isSuccessFormFirst,
        formDataFirst: payload.formDataFirst,
      } as ISignUpCompanyState
    case SignUpCompanyActionKind.IS_LOADING:
      return {
        ...state,
        isLoading: payload.isLoading,
      } as ISignUpCompanyState
    case SignUpCompanyActionKind.IS_LOADING_SUCCESS:
      return {
        ...state,
        isLoading: payload.isLoading,
        isSuccessForms: payload.isSuccessForms,
        validationMessage: payload.validationMessage,
      } as ISignUpCompanyState
    case SignUpCompanyActionKind.ERROR_MESSAGE:
      return {
        ...state,
        isLoading: payload.isLoading,
        validationMessage: payload.validationMessage,
      } as ISignUpCompanyState
    default:
      return state
  }
}

const Company: NextPage = () => {
  const [state, dispatch] = useReducer(signUpReducer, initialState)
  const { isSuccessFormFirst, isSuccessForms, isLoading, formDataFirst, validationMessage } = state

  function successFormFirst(isSuccess: boolean, data: IBaseFormStepFirst) {
    if (!isSuccess) return
    dispatch({
      type: SignUpCompanyActionKind.SUCCESS_FORM_FIRST,
      payload: {
        isSuccessFormFirst: isSuccess,
        formDataFirst: data,
      } as ISignUpCompanyState,
    })
  }

  async function successFormSecond(isSuccess: boolean, data: IBaseFormStepSecond) {
    if (!isSuccess) return
    try {
      dispatch({
        type: SignUpCompanyActionKind.IS_LOADING,
        payload: {
          isLoading: true,
        } as ISignUpCompanyState,
      })
      const userData = { ...formDataFirst, ...data, role: 'company' as RoleType }
      const response = await $api.post(PUBLIC_REQUESTS.SIGN_UP, { params: userData })
      dispatch({
        type: SignUpCompanyActionKind.IS_LOADING_SUCCESS,
        payload: {
          isLoading: false,
          isSuccessForms: true,
          validationMessage: response.data.message || null,
        } as ISignUpCompanyState,
      })
    } catch (e) {
      dispatch({
        type: SignUpCompanyActionKind.ERROR_MESSAGE,
        payload: { isLoading: false, validationMessage: e.response.data.message || e.message } as ISignUpCompanyState,
      })
    }
  }

  return (
    <div>
      <Head>
        <title>LearnLangPlatform - Registration Company</title>
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
              <Breadcrumb.Item>Company</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <Layout className="section-registration">
          <div className="container">
            <Title level={2} className="section-registration__heading">
              Registration Company
            </Title>
            {!isSuccessForms ? (
              <Row justify="center" gutter={[40, 40]}>
                <Col span={24} md={14} lg={10}>
                  <BaseFormStepFirst onSuccess={successFormFirst} />
                </Col>
                {isSuccessFormFirst ? (
                  <Col span={24} md={14} lg={10}>
                    <CompanyStepSecond
                      onSuccess={successFormSecond}
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

export default Company
