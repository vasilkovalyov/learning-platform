import React, { useEffect } from 'react'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input/Input'
import Password from 'antd/lib/input/Password'
import { Button } from 'antd'
import { RoleType } from '../../types/common'
import { IUserStudent, IUserTeacher, IUserCompany } from 'intefaces/user'

function AccountForm({
  onSuccess,
  isLoading,
  formData,
  validationMessage,
  role,
}: {
  onSuccess?: <T>(isSuccess: boolean, data: T) => void
  isLoading?: boolean
  formData: IUserStudent | (IUserStudent & IUserTeacher) | (IUserStudent & IUserCompany) | null
  validationMessage?: string | null
  role: RoleType
}) {
  const [form] = Form.useForm()

  useEffect(() => {
    if (!formData) return
    form.setFieldsValue(formData)
  }, [formData])

  function onFinish<T>(values: T) {
    onSuccess && onSuccess(true, values)
  }

  return (
    <Form
      form={form}
      name="account-user"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
      className="form form-admin"
    >
      {role === 'teacher' || role === 'student' ? (
        <Form.Item
          className="form__input-field form__input-field--input"
          name="fullname"
          label="Full name"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input id="fullname" name="fullname" type="text" className="form__input" />
        </Form.Item>
      ) : null}
      <Form.Item
        className="form__input-field form__input-field--input"
        name="login"
        label="Login"
        rules={[{ required: true, message: 'Please input your login!' }]}
      >
        <Input id="login" name="login" className="form__input" />
      </Form.Item>
      {role === 'company' ? (
        <Form.Item
          className="form__input-field form__input-field--input"
          label="Company name"
          name="company_name"
          rules={[{ required: true, message: 'Please input your Company name!' }]}
        >
          <Input id="company-name" name="company_name" className="form__input" />
        </Form.Item>
      ) : null}

      <Form.Item className="form__input-field form__input-field--password" label="Password" name="password">
        <Password id="password" name="password" className="form__input" />
      </Form.Item>
      <Form.Item
        className="form__input-field form__input-field--input"
        name="email"
        label="Email"
        rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}
      >
        <Input id="email" name="email" type="email" className="form__input" />
      </Form.Item>
      <Form.Item
        className="form__input-field form__input-field--input"
        name="phone"
        label="Phone"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input id="phone" name="phone" className="form__input" />
      </Form.Item>
      {validationMessage && <p>{validationMessage}</p>}
      <Form.Item wrapperCol={{ span: 24 }} className="form__input-field form__input-field--button">
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Save changes
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AccountForm
