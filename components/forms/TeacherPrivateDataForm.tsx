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
import { ITeacherPrivateData } from 'intefaces/teacher.interface'

import { Button } from 'antd'

const { Title } = Typography

import TeacherService from 'services/teacher.service'

import timeZones from 'static-data/local-times.json'

import levelEducation from 'static-data/level-education.json'
import speakingAccent from 'static-data/speaking-accents.json'
import langSpeaking from 'static-data/lang-speaking.json'
import langTeaching from 'static-data/lang-teaching.json'
import subjects from 'static-data/subjects.json'
import studentsAges from 'static-data/students-ages.json'

const fields_lang_speaking = [
  {
    lang_speaking: langSpeaking[0],
  },
]

const fields_lang_teaching = [
  {
    lang_speaking: langTeaching[0],
  },
]

const fields_subjects = [
  {
    lang_speaking: subjects[0],
  },
]

const fields_students_ages = [
  {
    lang_speaking: studentsAges[0],
  },
]

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
      lang_speaking: fields_lang_speaking,
      students_ages: fields_students_ages,
      lang_teaching: fields_lang_teaching,
      subjects: fields_subjects,
      levels_studying: fields_levels_studying,
      speaking_accent: fields_speaking_accent,
      lesson_content: fields_lesson_content,
      tests: fields_tests,
      education: fields_education,
      work_experience: fields_work_experience,
      certificates: fields_certificates,
    })
  }, [])

  useEffect(() => {
    TeacherService.loadPrivateData(localStorage.getItem('userId') || '').then((res) => {
      console.log(res)
      form.setFieldsValue({
        country: res.private_data.country,
        state: res.private_data.state,
        city: res.private_data.city,
        work_experience: res.private_data.work_experience,
      })
    })
  })

  function onFinish(values) {
    const data: ITeacherPrivateData = {
      _id: localStorage.getItem('userId') || '',
      private_data: {
        address: values.address,
        country: values.country,
        state: values.state,
        city: values.city,
        certificates: values.certificates,
        education: values.education,
        work_experience: values.work_experience,
        local_time: values.local_time,
        about_info: values.about_info,
      },
      lessons: {
        lesson_1: values.lesson_1,
        lesson_10: values.lesson_10,
        lesson_20: values.lesson_20,
        lesson_5: values.lesson_5,
        lesson_duration: +values.lesson_duration,
      },
      services: {
        lang_speaking: values.lang_speaking,
        lang_teaching: values.lang_teaching,
        lesson_content: values.lesson_content,
        levels_studying: values.levels_studying,
        speaking_accent: values.speaking_accent,
        students_ages: values.students_ages,
        subjects: values.subjects,
        tests: values.tests,
      },
    }
    const response = TeacherService.savePrivateData(data)
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
        </Col>
        <Col span={24} md={12}>
          <Form.Item className="form__input-field form__input-field--textarea" name="about_info" label="About">
            <TextArea id="about_info" name="about_info" className="form__textarea" rows={6} />
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
      </Row>
      <Row gutter={24} justify="space-between">
        <Col span={24} md={12}>
          <Form.Item label="Language speaking" className="form__input-field form__input-field--select">
            <Form.List name="lang_speaking">
              {(fields_lang_speaking, { add, remove }) => (
                <>
                  {fields_lang_speaking.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: 'flex' }} align="baseline" className="space-select">
                      <Form.Item
                        {...restField}
                        name={[name, 'lang_speaking']}
                        className="form__input-field form__input-field--input"
                      >
                        <Select id="lang_speaking" className="form__select" showSearch optionFilterProp="children">
                          {langSpeaking &&
                            langSpeaking.length &&
                            langSpeaking.map((ls) => (
                              <React.Fragment key={ls.id}>
                                {ls.value !== '' ? (
                                  <Select.Option key={ls.id} value={ls.value}>
                                    {ls.label}
                                  </Select.Option>
                                ) : null}
                              </React.Fragment>
                            ))}
                        </Select>
                      </Form.Item>
                      {name !== 0 ? (
                        <MinusCircleOutlined className="form__add-field-btn" onClick={() => remove(name)} />
                      ) : null}
                      <PlusCircleOutlined className="form__add-field-btn" onClick={() => add()} />
                    </Space>
                  ))}
                </>
              )}
            </Form.List>
          </Form.Item>
          <Form.Item label="Students ages" className="form__input-field form__input-field--select">
            <Form.List name="students_ages">
              {(fields_students_ages, { add, remove }) => (
                <>
                  {fields_students_ages.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: 'flex' }} align="baseline" className="space-select">
                      <Form.Item
                        {...restField}
                        name={[name, 'students_ages']}
                        className="form__input-field form__input-field--input"
                      >
                        <Select id="students_ages" className="form__select" showSearch optionFilterProp="children">
                          {studentsAges &&
                            studentsAges.length &&
                            studentsAges.map((sa) => (
                              <React.Fragment key={sa.id}>
                                {sa.value !== '' ? (
                                  <Select.Option key={sa.id} value={sa.value}>
                                    {sa.label}
                                  </Select.Option>
                                ) : null}
                              </React.Fragment>
                            ))}
                        </Select>
                      </Form.Item>
                      {name !== 0 ? (
                        <MinusCircleOutlined className="form__add-field-btn" onClick={() => remove(name)} />
                      ) : null}
                      <PlusCircleOutlined className="form__add-field-btn" onClick={() => add()} />
                    </Space>
                  ))}
                </>
              )}
            </Form.List>
          </Form.Item>
        </Col>
        <Col span={24} md={12}>
          <Form.Item label="Language teaching" className="form__input-field form__input-field--select">
            <Form.List name="lang_teaching">
              {(fields_lang_teaching, { add, remove }) => (
                <>
                  {fields_lang_teaching.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: 'flex' }} align="baseline" className="space-select">
                      <Form.Item
                        {...restField}
                        name={[name, 'lang_teaching']}
                        className="form__input-field form__input-field--input"
                      >
                        <Select id="lang_teaching" className="form__select" showSearch optionFilterProp="children">
                          {langTeaching &&
                            langTeaching.length &&
                            langTeaching.map((lt) => (
                              <React.Fragment key={lt.id}>
                                {lt.value !== '' ? (
                                  <Select.Option key={lt.id} value={lt.value}>
                                    {lt.label}
                                  </Select.Option>
                                ) : null}
                              </React.Fragment>
                            ))}
                        </Select>
                      </Form.Item>
                      {name !== 0 ? (
                        <MinusCircleOutlined className="form__add-field-btn" onClick={() => remove(name)} />
                      ) : null}
                      <PlusCircleOutlined className="form__add-field-btn" onClick={() => add()} />
                    </Space>
                  ))}
                </>
              )}
            </Form.List>
          </Form.Item>
          <Form.Item label="Subjects" className="form__input-field form__input-field--select">
            <Form.List name="subjects">
              {(fields_subjects, { add, remove }) => (
                <>
                  {fields_subjects.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: 'flex' }} align="baseline" className="space-select">
                      <Form.Item
                        {...restField}
                        name={[name, 'subjects']}
                        className="form__input-field form__input-field--input"
                      >
                        <Select id="subjects" className="form__select" showSearch optionFilterProp="children">
                          {subjects &&
                            subjects.length &&
                            subjects.map((subject) => (
                              <React.Fragment key={subject.id}>
                                {subject.value !== '' ? (
                                  <Select.Option key={subject.id} value={subject.value}>
                                    {subject.label}
                                  </Select.Option>
                                ) : null}
                              </React.Fragment>
                            ))}
                        </Select>
                      </Form.Item>
                      {name !== 0 ? (
                        <MinusCircleOutlined className="form__add-field-btn" onClick={() => remove(name)} />
                      ) : null}
                      <PlusCircleOutlined className="form__add-field-btn" onClick={() => add()} />
                    </Space>
                  ))}
                </>
              )}
            </Form.List>
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
                    <Space key={key} style={{ display: 'flex' }} align="baseline" className="space-select">
                      <Form.Item
                        {...restField}
                        name={[name, 'levels_studying']}
                        className="form__input-field form__input-field--input"
                      >
                        <Select id="levels_studying" className="form__select" showSearch optionFilterProp="children">
                          {levelEducation &&
                            levelEducation.length &&
                            levelEducation.map((le) => (
                              <React.Fragment key={le.id}>
                                {le.value !== '' ? (
                                  <Select.Option key={le.id} value={le.value}>
                                    {le.label}
                                  </Select.Option>
                                ) : null}
                              </React.Fragment>
                            ))}
                        </Select>
                      </Form.Item>
                      {name !== 0 ? (
                        <MinusCircleOutlined className="form__add-field-btn" onClick={() => remove(name)} />
                      ) : null}
                      <PlusCircleOutlined className="form__add-field-btn" onClick={() => add()} />
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
                    <Space key={key} style={{ display: 'flex' }} align="baseline" className="space-select">
                      <Form.Item
                        {...restField}
                        name={[name, 'speaking_accent']}
                        className="form__input-field form__input-field--input"
                      >
                        <Select id="speaking_accent" className="form__select" showSearch optionFilterProp="children">
                          {speakingAccent &&
                            speakingAccent.length &&
                            speakingAccent.map((sa) => (
                              <React.Fragment key={sa.id}>
                                {sa.value !== '' ? (
                                  <Select.Option key={sa.id} value={sa.value}>
                                    {sa.label}
                                  </Select.Option>
                                ) : null}
                              </React.Fragment>
                            ))}
                        </Select>
                      </Form.Item>
                      {name !== 0 ? (
                        <MinusCircleOutlined className="form__add-field-btn" onClick={() => remove(name)} />
                      ) : null}
                      <PlusCircleOutlined className="form__add-field-btn" onClick={() => add()} />
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
                    <Space key={key} style={{ display: 'flex' }} align="baseline" className="space-select">
                      <Form.Item
                        {...restField}
                        name={[name, 'lesson_content']}
                        className="form__input-field form__input-field--input"
                      >
                        <Input id="lesson_content" name="lesson_content" type="text" className="form__input" />
                      </Form.Item>
                      {name !== 0 ? (
                        <MinusCircleOutlined className="form__add-field-btn" onClick={() => remove(name)} />
                      ) : null}
                      <PlusCircleOutlined className="form__add-field-btn" onClick={() => add()} />
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
                    <Space key={key} style={{ display: 'flex' }} align="baseline" className="space-select">
                      <Form.Item
                        {...restField}
                        name={[name, 'tests']}
                        className="form__input-field form__input-field--input"
                      >
                        <Input id="tests" name="tests" type="text" className="form__input" />
                      </Form.Item>
                      {name !== 0 ? (
                        <MinusCircleOutlined className="form__add-field-btn" onClick={() => remove(name)} />
                      ) : null}
                      <PlusCircleOutlined className="form__add-field-btn" onClick={() => add()} />
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
                    <Space key={key} style={{ display: 'flex' }} align="baseline" className="space-select">
                      <Form.Item
                        {...restField}
                        name={[name, 'education']}
                        className="form__input-field form__input-field--input"
                      >
                        <Input id="education" name="education" type="text" className="form__input" />
                      </Form.Item>
                      {name !== 0 ? (
                        <MinusCircleOutlined className="form__add-field-btn" onClick={() => remove(name)} />
                      ) : null}
                      <PlusCircleOutlined className="form__add-field-btn" onClick={() => add()} />
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
                    <Space key={key} style={{ display: 'flex' }} align="baseline" className="space-select">
                      <Form.Item
                        {...restField}
                        name={[name, 'work_experience']}
                        className="form__input-field form__input-field--input"
                      >
                        <Input id="work_experience" name="work_experience" type="text" className="form__input" />
                      </Form.Item>
                      {name !== 0 ? (
                        <MinusCircleOutlined className="form__add-field-btn" onClick={() => remove(name)} />
                      ) : null}
                      <PlusCircleOutlined className="form__add-field-btn" onClick={() => add()} />
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
                    <Space key={key} style={{ display: 'flex' }} align="baseline" className="space-select">
                      <Form.Item
                        {...restField}
                        name={[name, 'certificates']}
                        className="form__input-field form__input-field--input"
                      >
                        <Input id="certificates" name="certificates" type="text" className="form__input" />
                      </Form.Item>
                      {name !== 0 ? (
                        <MinusCircleOutlined className="form__add-field-btn" onClick={() => remove(name)} />
                      ) : null}
                      <PlusCircleOutlined className="form__add-field-btn" onClick={() => add()} />
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
