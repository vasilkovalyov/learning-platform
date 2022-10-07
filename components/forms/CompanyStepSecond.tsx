import React, { useRef } from 'react'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input/Input'
import { Button } from 'antd'
import Checkbox from 'antd/lib/checkbox'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'

import { IFormAddress } from '../../intefaces/auth'

export interface IBaseFormStepSecond extends IFormAddress {
  company_name: string
  inn_code: string
  legal_address: string
  mailing_address: string
}

function CompanyStepSecond({
  onSuccess,
  isLoading,
  validationMessage,
}: {
  onSuccess?: (isSuccess: boolean, data: IBaseFormStepSecond) => void
  isLoading?: boolean
  validationMessage?: string | null
}) {
  const legalAddress = useRef(null)
  const mailingAddress = useRef(null)
  const [form] = Form.useForm()

  function onFinish(values: IBaseFormStepSecond) {
    onSuccess && onSuccess(true, values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const onChangeCheckbox = (e: CheckboxChangeEvent) => {
    form.setFieldsValue({ mailing_address: form.getFieldValue('legal_address') })
  }

  return (
    <Form
      form={form}
      name="sign-up-company"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="form-auth form-auth--register form-auth--register-company form-auth--register-company-2"
    >
      <Form.Item
        className="form-auth__input-field form-auth__input-field--input"
        label="Company name"
        name="company_name"
        rules={[{ required: true, message: 'Please input your Company name!' }]}
      >
        <Input id="company-name" name="company_name" className="form-auth__input" />
      </Form.Item>
      <Form.Item
        className="form-auth__input-field form-auth__input-field--input"
        label="Identification code"
        name="inn_code"
        rules={[{ required: true, message: 'Please input your inn code!' }]}
      >
        <Input id="inn-code" name="inn_code" className="form-auth__input" />
      </Form.Item>
      <Form.Item
        className="form-auth__input-field form-auth__input-field--input"
        label="Country"
        name="country"
        rules={[{ required: true, message: 'Please input your country!' }]}
      >
        <Input id="country" name="country" className="form-auth__input" />
      </Form.Item>
      <Form.Item
        className="form-auth__input-field form-auth__input-field--input"
        label="City"
        name="city"
        rules={[{ required: true, message: 'Please input your City!' }]}
      >
        <Input id="city" name="city" className="form-auth__input" />
      </Form.Item>
      <Form.Item
        className="form-auth__input-field form-auth__input-field--input"
        label="Legal address"
        name="legal_address"
        rules={[{ required: true, message: 'Please input your Legal address!' }]}
      >
        <Input id="legal-address" name="legal_address" className="form-auth__input" ref={legalAddress} />
      </Form.Item>
      <Form.Item
        className="form-auth__input-field form-auth__input-field--input"
        label="Mailing address"
        name="mailing_address"
        rules={[{ required: true, message: 'Please input your Mailing address!' }]}
      >
        <Input id="mailing-address" name="mailing_address" className="form-auth__input" ref={mailingAddress} />
      </Form.Item>
      <Checkbox onChange={onChangeCheckbox}>Matches legal address</Checkbox>
      <Form.Item wrapperCol={{ span: 24 }} className="form-auth__input-field form-auth__input-field--button">
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Create account
        </Button>
      </Form.Item>
      {validationMessage && <p>{validationMessage}</p>}
    </Form>
  )
}

export default CompanyStepSecond
