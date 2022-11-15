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
import speakingAccent from 'static-data/speaking-accents.json'

const lesson_duration = [
  {
    id: 1,
    label: '30 min',
    value: '30',
  },
  {
    id: 2,
    label: '45 min',
    value: '45',
  },
  {
    id: 3,
    label: '1 hour',
    value: '60',
  },
  {
    id: 4,
    label: '1 hour 30 min',
    value: '90',
  },
]

const lessons_info = {
  lessons: [
    {
      id: '1',
      label: 'For 1 lesson',
      value: '10$',
    },
    {
      id: '3',
      label: 'For 5 lesson',
      value: '50$',
    },
    {
      id: '2',
      label: 'For 10 lesson',
      value: '100$',
    },
    {
      id: '4',
      label: 'For 20 lesson',
      value: '200$',
    },
  ],
  lesson_duration: {
    id: 3,
    label: '1 hour',
    value: '60',
  },
}

const fields_levels_studying = [
  {
    levels_studying: levelEducation[0],
  },
]

const fields_speaking_accent = [
  {
    speaking_accent: speakingAccent[0],
  },
]

const fields_lesson_content = [
  {
    lesson_content: '',
  },
]

const fields_tests = [
  {
    tests: '',
  },
]

const fields_education = [
  {
    education: '',
  },
]

const fields_work_experience = [
  {
    work_experience: '',
  },
]

const fields_certificates = [
  {
    certificates: '',
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
      levels_studying: fields_levels_studying,
      speaking_accent: fields_speaking_accent,
      lesson_content: fields_lesson_content,
      tests: fields_tests,
      education: fields_education,
      work_experience: fields_work_experience,
      certificates: fields_certificates,
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
                    {tm.label}
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
            className="form__input-field form__input-field--select"
            name="lesson_duration"
            label="Lessons duration"
          >
            <Select id="lesson_duration" className="form__select" showSearch optionFilterProp="children">
              {lesson_duration &&
                lesson_duration.length &&
                lesson_duration.map((ld) => (
                  <Select.Option key={ld.id} value={ld.value}>
                    {ld.label}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24} justify="space-between">
        <Col span={24} md={12}>
          <Form.Item label="Levels studying" className="form__input-field form__input-field--select">
            <Form.List name="levels_studying">
              {(fields_levels_studying, { add, remove }) => (
                <>
                  {fields_levels_studying.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: 'flex', marginBottom: 8 }}
                      align="baseline"
                      className="space-select"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, 'levels_studying']}
                        className="form__input-field form__input-field--input"
                      >
                        <Select id="levels_studying" className="form__select" showSearch optionFilterProp="children">
                          {levelEducation &&
                            levelEducation.length &&
                            levelEducation.map((le) => (
                              <>
                                {le.value !== '' ? (
                                  <Select.Option key={le.id} value={le.value}>
                                    {le.label}
                                  </Select.Option>
                                ) : null}
                              </>
                            ))}
                        </Select>
                      </Form.Item>
                      {name !== 0 ? <MinusCircleOutlined onClick={() => remove(name)} /> : null}
                      <PlusCircleOutlined onClick={() => add()} />
                    </Space>
                  ))}
                </>
              )}
            </Form.List>
          </Form.Item>
          <Form.Item label="Speaking accent" className="form__input-field form__input-field--select">
            <Form.List name="speaking_accent">
              {(fields_speaking_accent, { add, remove }) => (
                <>
                  {fields_speaking_accent.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: 'flex', marginBottom: 8 }}
                      align="baseline"
                      className="space-select"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, 'speaking_accent']}
                        className="form__input-field form__input-field--input"
                      >
                        <Select id="speaking_accent" className="form__select" showSearch optionFilterProp="children">
                          {speakingAccent &&
                            speakingAccent.length &&
                            speakingAccent.map((sa) => (
                              <>
                                {sa.value !== '' ? (
                                  <Select.Option key={sa.id} value={sa.value}>
                                    {sa.label}
                                  </Select.Option>
                                ) : null}
                              </>
                            ))}
                        </Select>
                      </Form.Item>
                      {name !== 0 ? <MinusCircleOutlined onClick={() => remove(name)} /> : null}
                      <PlusCircleOutlined onClick={() => add()} />
                    </Space>
                  ))}
                </>
              )}
            </Form.List>
          </Form.Item>
          <Form.Item label="Lesson content" className="form__input-field form__input-field--input">
            <Form.List name="lesson_content">
              {(fields_lesson_content, { add, remove }) => (
                <>
                  {fields_lesson_content.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: 'flex', marginBottom: 8 }}
                      align="baseline"
                      className="space-select"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, 'lesson_content']}
                        className="form__input-field form__input-field--input"
                      >
                        <Input id="lesson_content" name="lesson_content" type="text" className="form__input" />
                      </Form.Item>
                      {name !== 0 ? <MinusCircleOutlined onClick={() => remove(name)} /> : null}
                      <PlusCircleOutlined onClick={() => add()} />
                    </Space>
                  ))}
                </>
              )}
            </Form.List>
          </Form.Item>
          <Form.Item label="Tests" className="form__input-field form__input-field--input">
            <Form.List name="tests">
              {(fields_tests, { add, remove }) => (
                <>
                  {fields_tests.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: 'flex', marginBottom: 8 }}
                      align="baseline"
                      className="space-select"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, 'tests']}
                        className="form__input-field form__input-field--input"
                      >
                        <Input id="tests" name="tests" type="text" className="form__input" />
                      </Form.Item>
                      {name !== 0 ? <MinusCircleOutlined onClick={() => remove(name)} /> : null}
                      <PlusCircleOutlined onClick={() => add()} />
                    </Space>
                  ))}
                </>
              )}
            </Form.List>
          </Form.Item>
        </Col>
        <Col span={24} md={12}>
          <Form.Item label="Education" className="form__input-field form__input-field--input">
            <Form.List name="education">
              {(fields_education, { add, remove }) => (
                <>
                  {fields_education.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: 'flex', marginBottom: 8 }}
                      align="baseline"
                      className="space-select"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, 'education']}
                        className="form__input-field form__input-field--input"
                      >
                        <Input id="education" name="education" type="text" className="form__input" />
                      </Form.Item>
                      {name !== 0 ? <MinusCircleOutlined onClick={() => remove(name)} /> : null}
                      <PlusCircleOutlined onClick={() => add()} />
                    </Space>
                  ))}
                </>
              )}
            </Form.List>
          </Form.Item>
          <Form.Item label="Work experience" className="form__input-field form__input-field--input">
            <Form.List name="work_experience">
              {(fields_work_experience, { add, remove }) => (
                <>
                  {fields_work_experience.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: 'flex', marginBottom: 8 }}
                      align="baseline"
                      className="space-select"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, 'work_experience']}
                        className="form__input-field form__input-field--input"
                      >
                        <Input id="work_experience" name="work_experience" type="text" className="form__input" />
                      </Form.Item>
                      {name !== 0 ? <MinusCircleOutlined onClick={() => remove(name)} /> : null}
                      <PlusCircleOutlined onClick={() => add()} />
                    </Space>
                  ))}
                </>
              )}
            </Form.List>
          </Form.Item>
          <Form.Item label="Certificates" className="form__input-field form__input-field--input">
            <Form.List name="certificates">
              {(fields_certificates, { add, remove }) => (
                <>
                  {fields_certificates.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: 'flex', marginBottom: 8 }}
                      align="baseline"
                      className="space-select"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, 'certificates']}
                        className="form__input-field form__input-field--input"
                      >
                        <Input id="certificates" name="certificates" type="text" className="form__input" />
                      </Form.Item>
                      {name !== 0 ? <MinusCircleOutlined onClick={() => remove(name)} /> : null}
                      <PlusCircleOutlined onClick={() => add()} />
                    </Space>
                  ))}
                </>
              )}
            </Form.List>
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

export default TeacherPrivateDataForm
