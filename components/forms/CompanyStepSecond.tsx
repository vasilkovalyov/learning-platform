import React from 'react'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input/Input'
import { Button } from 'antd'
import Checkbox from 'antd/lib/checkbox'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'

function CompanyStepSecond() {
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const onChangeCheckbox = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`)
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
        label="Company name"
        name="company-name"
        rules={[{ required: true, message: 'Please input your Company name!' }]}
      >
        <Input id="company-name" name="company-name" className="form-auth__input" />
      </Form.Item>
      <Form.Item
        className="form-auth__input-field form-auth__input-field--input"
        label="Identification code"
        name="inn-code"
        rules={[{ required: true, message: 'Please input your inn code!' }]}
      >
        <Input id="inn-code" name="inn-code" className="form-auth__input" />
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
        name="legal-address"
        rules={[{ required: true, message: 'Please input your Legal address!' }]}
      >
        <Input id="legal-address" name="legal-address" className="form-auth__input" />
      </Form.Item>
      <Form.Item
        className="form-auth__input-field form-auth__input-field--input"
        label="Mailing address"
        name="mailing-address"
        rules={[{ required: true, message: 'Please input your Mailing address!' }]}
      >
        <Input id="mailing-address" name="mailing-address" className="form-auth__input" />
      </Form.Item>
      <Checkbox onChange={onChangeCheckbox}>Matches legal address</Checkbox>
      <Form.Item wrapperCol={{ span: 24 }} className="form-auth__input-field form-auth__input-field--button">
        <Button type="primary">Create account</Button>
      </Form.Item>
    </Form>
  )
}

export default CompanyStepSecond
