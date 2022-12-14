import React from 'react'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input/Input'
import Password from 'antd/lib/input/Password'
import { Button } from 'antd'
import { IFormData, IFormDataCompany } from '../../intefaces/auth'

export type BaseFormStepFirstType = IFormData & Pick<IFormDataCompany, 'phone'>

function BaseFormStepFirst({ onSuccess }: { onSuccess?: (isSuccess: boolean, data: BaseFormStepFirstType) => void }) {
  function onFinish(values: BaseFormStepFirstType) {
    onSuccess && onSuccess(true, values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      name="base-from-step"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="form form-auth form-auth-form--register"
    >
      <Form.Item
        className="form__input-field form__input-field--input"
        name="login"
        label="Login"
        rules={[{ required: true, message: 'Please input your login!' }]}
      >
        <Input id="login" name="login" />
      </Form.Item>
      <Form.Item
        className="form__input-field form__input-field--input"
        name="email"
        label="Email"
        rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}
      >
        <Input id="email" name="email" />
      </Form.Item>
      <Form.Item
        className="form__input-field form__input-field--password"
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Password id="password" name="password" className="form__input" />
      </Form.Item>
      <Form.Item
        className="form__input-field form__input-field--password form__input-field--confirm-password"
        name="confirm_password"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'))
            },
          }),
        ]}
      >
        <Password id="confirm-password" name="confirm_password" />
      </Form.Item>
      <Form.Item
        className="form__input-field form__input-field--input"
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input id="phone" name="phone" />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }} className="form__input-field form__input-field--button">
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </Form.Item>
    </Form>
  )
}

export default BaseFormStepFirst
