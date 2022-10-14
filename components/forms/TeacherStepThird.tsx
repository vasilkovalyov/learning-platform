import React from 'react'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input/Input'
import Space from 'antd/lib/space'
import { Button } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

import { IFormEducation } from '../../intefaces/auth'

export interface IAdditionalFields {
  education_rest?: {
    education_rest: string
  }[]
  work_experience_rest?: {
    work_experience_rest: string
  }[]
}

function TeacherStepThird({
  onSuccess,
  isLoading,
  validationMessage,
}: {
  onSuccess?: (isSuccess: boolean, data: IFormEducation) => void
  isLoading?: boolean
  validationMessage?: string | null
}) {
  function onFinish(values: IFormEducation & IAdditionalFields) {
    const educationArr = values.education_rest ? values.education_rest.map((el) => el.education_rest) : []
    const workArr = values.work_experience_rest ? values.work_experience_rest.map((el) => el.work_experience_rest) : []

    const updateValues = {
      education: [values.education, ...educationArr],
      work_experience: [values.work_experience, ...workArr],
    } as IFormEducation
    onSuccess && onSuccess(true, updateValues)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      name="sign-up-teacher"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="form form-auth form-auth--register"
    >
      <Form.Item
        className="form__input-field form__input-field--input"
        label="Education"
        name="education"
        rules={[{ required: true, message: 'Please input your education!' }]}
      >
        <Input id="education" name="education" className="form__input" />
      </Form.Item>
      <Form.List name="education_rest">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'education_rest']}
                  className="form__input-field form__input-field--input"
                >
                  <Input placeholder="Education" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />} className="form__add-field-btn">
                Add education
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item
        className="form__input-field form__input-field--input"
        label="Work experience"
        name="work_experience"
        rules={[{ required: true, message: 'Please input your work-experience!' }]}
      >
        <Input id="work-experience" name="work_experience" className="form__input" />
      </Form.Item>
      <Form.List name="work_experience_rest">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'work_experience_rest']}
                  className="form__input-field form__input-field--input"
                >
                  <Input placeholder="Work experience" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />} className="form__add-field-btn">
                Add work experience
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item wrapperCol={{ span: 24 }} className="form__input-field form__input-field--button">
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Create account{' '}
        </Button>
      </Form.Item>
      {validationMessage && <p>{validationMessage}</p>}
    </Form>
  )
}

export default TeacherStepThird
