import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input/Input'
import Password from 'antd/lib/input/Password'
import { Button } from 'antd'
import $api from '../../common/ajax-config'
import { PUBLIC_REQUESTS } from '../../constants/api-requests'
import { IFormData } from '../../intefaces/auth'
import status from 'constants/status'

function AuthForm() {
  const router = useRouter()
  const [dataResponse, setDataResponse] = useState<string>('')
  const onFinish = async (values: Pick<IFormData, 'email' | 'password'>) => {
    try {
      const response = await $api.post(PUBLIC_REQUESTS.SIGN_IN, { params: values })
      if (response.data.status === status.BAD_REQUEST) {
        setDataResponse(response.data.message)
        return
      }
      if (response.data.status === status.SUCCESS) router.push('/admin')
    } catch (e) {
      console.log(e)
      setDataResponse(e.message)
    }
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
      {dataResponse && <p>{dataResponse}</p>}
      <Form.Item wrapperCol={{ span: 24 }} className="form-auth__input-field form-auth__input-field--button">
        <Button type="primary" htmlType="submit">
          Sign in
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AuthForm