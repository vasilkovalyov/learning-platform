import React, { useState } from 'react'
import { message, Upload } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import type { UploadChangeParam } from 'antd/es/upload'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input/Input'
import Typography from 'antd/lib/typography'
import Password from 'antd/lib/input/Password'
import { Button } from 'antd'
import { IFormData } from '../../intefaces/auth'
import { RoleType } from '../../types/common'

const { Text } = Typography

export interface IAccountForm<T> extends Omit<IFormData, 'confirm_password'> {
  full_name
}

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}

function AccountForm({
  onSuccess,
  isLoading,
  validationMessage,
  role = 'student',
}: {
  onSuccess?: <T>(isSuccess: boolean, data: T) => void
  isLoading?: boolean
  validationMessage?: string | null
  role: RoleType
}) {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>()

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false)
        setImageUrl(url)
      })
    }
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  function onFinish<T>(values: T) {
    onSuccess && onSuccess(true, values)
  }

  return (
    <Form
      name="account-user"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
      className="form form-admin"
    >
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action=""
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
      {role === 'student' ? (
        <Form.Item
          className="form__input-field form__input-field--input"
          name="login"
          label="Login"
          rules={[{ required: true, message: 'Please input your login!' }]}
        >
          <>
            <Input id="login" name="login" className="form__input" />
            <Button type="text" className="form-admin__additional-btn">
              Remove the account
            </Button>
          </>
        </Form.Item>
      ) : null}
      {role === 'teacher' ? (
        <Form.Item
          className="form__input-field form__input-field--input"
          name="full_name"
          label="Full name"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <>
            <Input id="full-name" name="full_name" type="text" className="form__input" />
            <Button type="text" className="form-admin__additional-btn">
              Remove the account
            </Button>
          </>
        </Form.Item>
      ) : null}
      {role === 'company' ? (
        <Form.Item
          className="form__input-field form__input-field--input"
          label="Company name"
          name="company_name"
          rules={[{ required: true, message: 'Please input your Company name!' }]}
        >
          <>
            <Input id="company-name" name="company_name" className="form__input" />
            <Button type="text" className="form-admin__additional-btn">
              Remove the account
            </Button>
          </>
        </Form.Item>
      ) : null}

      <Form.Item
        className="form__input-field form__input-field--password"
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <>
          <Password id="password" name="password" className="form__input" />
          <Button type="text" className="form-admin__additional-btn">
            Change the password
          </Button>
        </>
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
