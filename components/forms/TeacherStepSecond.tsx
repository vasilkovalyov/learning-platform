import React from 'react'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input/Input'
import Password from 'antd/lib/input/Password'
import Typography from 'antd/lib/typography'
import { Button } from 'antd'

const { Text } = Typography

function TeacherStepSecond() {
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
      className="form-auth form-auth--register"
    >
      <Form.Item
        className="form-auth__input-field form-auth__input-field--input"
        label="Passport"
        name="passport"
        rules={[{ required: true, message: 'Please input your passport!' }]}
      >
        <Input id="passport" name="passport" className="form-auth__input" />
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
        rules={[{ required: true, message: 'Please input your city!' }]}
      >
        <Input id="city" name="city" className="form-auth__input" />
      </Form.Item>
      <Form.Item
        className="form-auth__input-field form-auth__input-field--input"
        label="Address"
        name="address"
        rules={[{ required: true, message: 'Please input your address!' }]}
      >
        <Input id="address" name="address" className="form-auth__input" />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }} className="form-auth__input-field form-auth__input-field--button">
        <Button type="primary">Next</Button>
      </Form.Item>
    </Form>
  )
}

export default TeacherStepSecond
