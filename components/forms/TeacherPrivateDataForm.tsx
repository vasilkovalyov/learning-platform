import React, { useEffect } from 'react'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input/Input'
import TextArea from 'antd/lib/input/TextArea'
import Select from 'antd/lib/select'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Typography from 'antd/lib/typography'
import Space from 'antd/lib/space'
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'

import { Button } from 'antd'

const { Title } = Typography
import timeZones from 'static-data/local-times.json'
import levelEducation from 'static-data/level-education.json'

const lessons_info = {
  lessons: [
    {
      id: '1',
      label: 'For 1 lesson',
      value: '10$',
    },
    {
      id: '2',
      label: 'For 10 lesson',
      value: '100$',
    },
    {
      id: '3',
      label: 'For 5 lesson',
      value: '50$',
    },
    {
      id: '4',
      label: 'For 20 lesson',
      value: '200$',
    },
  ],
  lesson_duration: '30 мин',
}

const fields = [
  {
    levels_studying: {
      id: 3,
      value: 'info_3',
      text: 'Info 3',
    },
  },
]

const getLessonsFormData = (lessons) => {
  const lessonObj = {}

  lessons.forEach((lesson) => {
    lessonObj['lesson-' + lesson.id] = lesson.value
  })
  return lessonObj
}

function TeacherPrivateDataForm() {
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue(getLessonsFormData(lessons_info.lessons))
    form.setFieldsValue({
      lesson_duration: lessons_info.lesson_duration,
    })
    form.setFieldsValue({
      levels_studying: fields,
    })
  }, [])

  function onFinish(values) {
    console.log('values', values)
  }

  return (
    <Form
      form={form}
      name="private-data-user"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      className="form form-admin"
      onFinish={onFinish}
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
                timeZones.map((tm) => (
                  <Select.Option key={tm.id} value={tm.value}>
                    {tm.text}
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
      <Title level={4} className="register-card__title">
        Lesson Info
      </Title>
      <Row gutter={24} justify="space-between">
        {lessons_info.lessons.length &&
          lessons_info.lessons.map((lesson) => (
            <Col key={lesson.id} span={24} md={12}>
              <Form.Item
                className="form__input-field form__input-field--input"
                name={`lesson-${lesson.id}`}
                label={lesson.label}
              >
                <Input id={`lesson-${lesson.id}`} name={`lesson-${lesson.id}`} type="text" className="form__input" />
              </Form.Item>
            </Col>
          ))}
        <Col span={24} md={12}>
          <Form.Item
            className="form__input-field form__input-field--input"
            name="lesson_duration"
            label="Lessons duration"
          >
            <Input id="lesson_duration" name="lesson_duration" type="text" className="form__input" />
          </Form.Item>
        </Col>
        <Col span={24} md={12}>
          <Form.Item label="Levels studying">
            <Form.List name="levels_studying">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item
                        {...restField}
                        name={[name, 'levels_studying']}
                        className="form__input-field form__input-field--input"
                      >
                        <Select id="levels_studying" className="form__select" showSearch optionFilterProp="children">
                          {levelEducation &&
                            levelEducation.length &&
                            levelEducation.map((tm) => (
                              <Select.Option key={tm.id} value={tm.value}>
                                {tm.text}
                              </Select.Option>
                            ))}
                        </Select>
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                      <PlusCircleOutlined onClick={() => add()} />
                    </Space>
                  ))}
                </>
              )}
            </Form.List>
          </Form.Item>
        </Col>
        {/* <Col span={24} md={12}>
          <Form.List name="speaking_accent">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'speaking_accent']}
                      className="form__input-field form__input-field--input"
                    >
                      <Select
                        id="speaking_accent"
                        className="form__select"
                        showSearch
                        optionFilterProp="children"
                        placeholder="Speaking accent"
                      >
                        {levelEducation &&
                          levelEducation.length &&
                          levelEducation.map((tm) => (
                            <Select.Option key={tm.id} value={tm.value}>
                              {tm.text}
                            </Select.Option>
                          ))}
                      </Select>
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                    <PlusCircleOutlined onClick={() => add()} />
                  </Space>
                ))}
              </>
            )}
          </Form.List>
        </Col> */}
        {/* <Col span={24} md={12}>
          <Form.List name="lesson_content">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'lesson_content']}
                      className="form__input-field form__input-field--input"
                    >
                      <Input placeholder="Lesson Content" />
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
        </Col>
        <Col span={24} md={12}>
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
        </Col>
        <Col span={24} md={12}>
          <Form.List name="tests">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'tests']}
                      className="form__input-field form__input-field--input"
                    >
                      <Input placeholder="Tests" />
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
        </Col>
        <Col span={24} md={12}>
          <Form.List name="education">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'education']}
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
        </Col>
        <Col span={24} md={12}>
          <Form.List name="work_experience">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'work_experience']}
                      className="form__input-field form__input-field--input"
                    >
                      <Input placeholder="Work Experience" />
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
        </Col>
        <Col span={24} md={12}>
          <Form.List name="certificates">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'certificates']}
                      className="form__input-field form__input-field--input"
                    >
                      <Input placeholder="Certificates" />
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
        </Col> */}
      </Row>
      <Form.Item wrapperCol={{ span: 24 }} className="form__input-field form__input-field--button">
        <Button type="primary" htmlType="submit">
          Save changes
        </Button>
      </Form.Item>
    </Form>
  )
}

export default TeacherPrivateDataForm
