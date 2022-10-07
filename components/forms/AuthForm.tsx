import React from 'react'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input/Input'
import Password from 'antd/lib/input/Password'
import { Button } from 'antd'
import { IFormData } from '../../intefaces/auth'

export type AuthFormData = Pick<IFormData, 'email' | 'password'>

function AuthForm({
  onSuccess,
  isLoading,
  validationMessage,
}: {
  onSuccess?: (isSuccess: boolean, data: AuthFormData) => void
  isLoading?: boolean
  validationMessage?: string | null
}) {
  function onFinish(values: AuthFormData) {
    onSuccess && onSuccess(true, values)
  }

  return (
    <Form
      name="auth-user"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
      className="form-auth"
    >
      <Form.Item
        className="form-auth__input-field form-auth__input-field--input"
        name="email"
        label="Email"
        rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}
      >
        <Input id="email" name="email" type="email" />
      </Form.Item>
      <Form.Item
        className="form-auth__input-field form-auth__input-field--password"
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Password id="password" name="password" className="form-auth__input" />
      </Form.Item>
      {validationMessage && <p>{validationMessage}</p>}
      <Form.Item wrapperCol={{ span: 24 }} className="form-auth__input-field form-auth__input-field--button">
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Sign in
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AuthForm
