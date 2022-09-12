import React from 'react'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input/Input'
import { Button } from 'antd'

function TeacherStepThird() {
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
        label="Education"
        name="education"
        rules={[{ required: true, message: 'Please input your education!' }]}
      >
        <Input id="education" name="education" className="form-auth__input" />
      </Form.Item>
      <Form.Item
        className="form-auth__input-field form-auth__input-field--input"
        label="Work experience"
        name="work-experience"
        rules={[{ required: true, message: 'Please input your work-experience!' }]}
      >
        <Input id="work-experience" name="work-experience" className="form-auth__input" />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }} className="form-auth__input-field form-auth__input-field--button">
        <Button type="primary">Create account </Button>
      </Form.Item>
    </Form>
  )
}

export default TeacherStepThird
