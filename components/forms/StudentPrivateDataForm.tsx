import React from 'react'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input/Input'
import TextArea from 'antd/lib/input/TextArea'
import Select from 'antd/lib/select'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import { Button } from 'antd'

const timeZones = [-1, -2, -3, -4, -5, -6, -7, -8, -9, -10, -11, -12, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

function StudentPrivateDataForm() {
  return (
    <Form
      name="private-data-user"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      className="form form-admin"
    >
      <Row gutter={24} justify="space-between">
        <Col span={24} md={12}>
          <Form.Item className="form__input-field form__input-field--input" name="country" label="Country">
            <Input id="country" name="country" type="country" className="form__input" />
          </Form.Item>
          <Form.Item className="form__input-field form__input-field--input" name="state" label="State">
            <Input id="state" name="state" type="state" className="form__input" />
          </Form.Item>
          <Form.Item className="form__input-field form__input-field--input" name="city" label="City">
            <Input id="city" name="city" type="city" className="form__input" />
          </Form.Item>
          <Form.Item label="Local time" name="local_time" className="form__input-field form__input-field--select">
            <Select id="local_time" className="form__select" showSearch optionFilterProp="children">
              {timeZones &&
                timeZones.length &&
                timeZones.map((tm, index) => (
                  <Select.Option key={index} value={tm}>
                    GMT{tm > 0 ? '+' : ' '}
                    {tm}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={24} md={12}>
          <Form.Item className="form__input-field form__input-field--textarea" name="about_info" label="About">
            <TextArea id="about_info" name="about_info" className="form__textarea" rows={6} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item wrapperCol={{ span: 24 }} className="form__input-field form__input-field--button">
        <Button type="primary" htmlType="submit">
          Save changes
        </Button>
      </Form.Item>
    </Form>
  )
}

export default StudentPrivateDataForm
