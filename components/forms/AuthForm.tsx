import React from 'react'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input/Input'
import Password from 'antd/lib/input/Password'
import { Button } from 'antd'

function AuthForm() {
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="form-auth"
    >
      <Form.Item
        className="form-auth__input-field form-auth__input-field--input"
        label="Login"
        name="login"
        rules={[{ required: true, message: 'Please input your login!' }]}
      >
        <Input className="form-auth__input" />
      </Form.Item>
      <Form.Item
        className="form-auth__input-field form-auth__input-field--password"
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Password className="form-auth__input" />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }} className="form-auth__input-field form-auth__input-field--button">
        <Button type="primary">Sign in</Button>
      </Form.Item>
    </Form>
  )
}

export default AuthForm
