import React, { useEffect, useState } from 'react'

import { ITeacherPrivateData } from 'intefaces/teacher.interface'
// import { openNotification } from 'common/utilities'

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
    lang_teaching: langTeaching[0],
  },
]

const fields_subjects = [
  {
    subjects: subjects[0],
  },
]

const fields_students_ages = [
  {
    students_ages: studentsAges[0],
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

const defaultOptions = {
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
}

function TeacherPrivateDataForm() {
  // const [form] = Form.useForm()
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false)

  useEffect(() => {
    // form.setFieldsValue(defaultOptions)
    TeacherService.loadPrivateData(localStorage.getItem('userId') || '').then((res: ITeacherPrivateData) => {
      // form.setFieldsValue({
      //   country: res.private_data.country,
      //   state: res.private_data.state,
      //   city: res.private_data.city,
      //   work_experience: res.private_data.work_experience?.map((item) => {
      //     return {
      //       work_experience: item,
      //     }
      //   }),
      //   education: res.private_data.education?.map((item) => {
      //     return {
      //       education: item,
      //     }
      //   }),
      //   lang_speaking: res.services.lang_speaking?.map((item) => {
      //     return {
      //       lang_speaking: item,
      //     }
      //   }),
      //   students_ages: res.services.students_ages?.map((item) => {
      //     return {
      //       students_ages: item,
      //     }
      //   }),
      //   lang_teaching: res.services.lang_teaching?.map((item) => {
      //     return {
      //       lang_teaching: item,
      //     }
      //   }),
      //   subjects: res.services.subjects?.map((item) => {
      //     return {
      //       subjects: item,
      //     }
      //   }),
      //   levels_studying: res.services.levels_studying?.map((item) => {
      //     return {
      //       levels_studying: item,
      //     }
      //   }),
      //   speaking_accent: res.services.speaking_accent?.map((item) => {
      //     return {
      //       speaking_accent: item,
      //     }
      //   }),
      //   lesson_content: res.services.lesson_content?.map((item) => {
      //     return {
      //       lesson_content: item,
      //     }
      //   }),
      //   tests: res.services.tests?.map((item) => {
      //     return {
      //       tests: item,
      //     }
      //   }),
      //   certificates: res.private_data.certificates?.map((item) => {
      //     return {
      //       certificates: item,
      //     }
      //   }),
      //   about_info: res.private_data.about_info,
      //   local_time: res.private_data.local_time,
      //   lesson_1: res.lessons?.lesson_1,
      //   lesson_5: res.lessons?.lesson_5,
      //   lesson_10: res.lessons?.lesson_10,
      //   lesson_20: res.lessons?.lesson_20,
      //   lesson_duration: res.lessons?.lesson_duration,
      // })
    })
  })

  function onFinish(values) {
    setIsLoadingSubmit(true)
    const data: ITeacherPrivateData = {
      _id: localStorage.getItem('userId') || '',
      private_data: {
        address: values.address,
        country: values.country,
        state: values.state,
        city: values.city,
        certificates: values.certificates.map((item) => item.certificates),
        education: values.education.map((item) => item.education),
        work_experience: values.work_experience.map((item) => item.work_experience),
        local_time: values.local_time.local_time,
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
        lang_speaking: values.lang_speaking.map((item) => item.lang_speaking),
        lang_teaching: values.lang_teaching.map((item) => item.lang_teaching),
        lesson_content: values.lesson_content.map((item) => item.lesson_content),
        levels_studying: values.levels_studying.map((item) => item.levels_studying),
        speaking_accent: values.speaking_accent.map((item) => item.speaking_accent),
        students_ages: values.students_ages.map((item) => item.students_ages),
        subjects: values.subjects.map((item) => item.subjects),
        tests: values.tests.map((item) => item.tests),
      },
    }
    TeacherService.savePrivateData(data).then((res) => {
      setIsLoadingSubmit(false)
      // openNotification('bottomRight')
    })
  }

  return (
    <form
      // form={form}
      name="private-data-user"
      // labelCol={{ span: 24 }}

      // initialValues={{ remember: true }}
      autoComplete="off"
      className="form form-admin"
      // onFinish={onFinish}
    >
      <div>
        <div>
          <div className="form__input-field form__input-field--input">
            <input id="country" name="country" type="country" className="form__input" />
          </div>
          <div className="form__input-field form__input-field--input">
            <input id="state" name="state" type="state" className="form__input" />
          </div>
          <div className="form__input-field form__input-field--input">
            <input id="city" name="city" type="city" className="form__input" />
          </div>
        </div>
        <div>
          <div className="form__input-field form__input-field--textarea">
            <textarea id="about_info" name="about_info" className="form__textarea" rows={6} />
          </div>
          <div className="form__input-field form__input-field--select">
            <select id="local_time" className="form__select">
              {timeZones &&
                timeZones.length &&
                timeZones.map((tm) => (
                  <li key={tm.id} value={tm.value}>
                    {tm.label}
                  </li>
                ))}
            </select>
          </div>
        </div>
      </div>
      <div>
        <div>
          <div className="form__input-field form__input-field--select">
            {/* <ul name="lang_speaking">
              {(fields_lang_speaking, { add, remove }) => (
                <>
                  {fields_lang_speaking.map(({ key, name, ...restField }) => (
                    <div key={key} style={{ display: 'flex' }} align="baseline" className="space-select">
                      <div
                        {...restField}
                        name={[name, 'lang_speaking']}
                        className="form__input-field form__input-field--input"
                      >
                        <select id="lang_speaking" className="form__select" showSearch optionFilterProp="children">
                          {langSpeaking &&
                            langSpeaking.length &&
                            langSpeaking.map((ls) => (
                              <React.Fragment key={ls.id}>
                                {ls.value !== '' ? (
                                  <li key={ls.id} value={ls.value}>
                                    {ls.label}
                                  </li>
                                ) : null}
                              </React.Fragment>
                            ))}
                        </select>
                      </div>
                      {name !== 0 ? (
                        <MinusCircleOutlined className="form__add-field-btn" onClick={() => remove(name)} />
                      ) : null}
                      <PlusCircleOutlined className="form__add-field-btn" onClick={() => add()} />
                    </div>
                  ))}
                </>
              )}
            </ul> */}
          </div>
          <div className="form__input-field form__input-field--select">
            <ul data-name="students_ages">
              {/* {(fields_students_ages, { add, remove }) => (
                <>
                  {fields_students_ages.map(({ key, name, ...restField }) => (
                    <div key={key} style={{ display: 'flex' }} align="baseline" className="space-select">
                      <div
                        {...restField}
                        name={[name, 'students_ages']}
                        className="form__input-field form__input-field--input"
                      >
                        <select id="students_ages" className="form__select" showSearch optionFilterProp="children">
                          {studentsAges &&
                            studentsAges.length &&
                            studentsAges.map((sa) => (
                              <React.Fragment key={sa.id}>
                                {sa.value !== '' ? (
                                  <li key={sa.id} value={sa.value}>
                                    {sa.label}
                                  </li>
                                ) : null}
                              </React.Fragment>
                            ))}
                        </select>
                      </div>
                      {name !== 0 ? (
                        <MinusCircleOutlined className="form__add-field-btn" onClick={() => remove(name)} />
                      ) : null}
                      <PlusCircleOutlined className="form__add-field-btn" onClick={() => add()} />
                    </div>
                  ))}
                </>
              )} */}
            </ul>
          </div>
        </div>
        <div>
          <div className="form__input-field form__input-field--select">
            <ul data-name="lang_teaching">
              {/* {(fields_lang_teaching, { add, remove }) => (
                <>
                  {fields_lang_teaching.map(({ key, name, ...restField }) => (
                    <div key={key} style={{ display: 'flex' }} align="baseline" className="space-select">
                      <div
                        {...restField}
                        name={[name, 'lang_teaching']}
                        className="form__input-field form__input-field--input"
                      >
                        <select id="lang_teaching" className="form__select" showSearch optionFilterProp="children">
                          {langTeaching &&
                            langTeaching.length &&
                            langTeaching.map((lt) => (
                              <React.Fragment key={lt.id}>
                                {lt.value !== '' ? (
                                  <li key={lt.id} value={lt.value}>
                                    {lt.label}
                                  </li>
                                ) : null}
                              </React.Fragment>
                            ))}
                        </select>
                      </div>
                      {name !== 0 ? (
                        <MinusCircleOutlined className="form__add-field-btn" onClick={() => remove(name)} />
                      ) : null}
                      <PlusCircleOutlined className="form__add-field-btn" onClick={() => add()} />
                    </div>
                  ))}
                </>
              )} */}
            </ul>
          </div>
          <div className="form__input-field form__input-field--select">
            <ul data-name="subjects">
              {/* {(fields_subjects, { add, remove }) => (
                <>
                  {fields_subjects.map(({ key, name, ...restField }) => (
                    <div key={key} style={{ display: 'flex' }} align="baseline" className="space-select">
                      <div
                        {...restField}
                        name={[name, 'subjects']}
                        className="form__input-field form__input-field--input"
                      >
                        <select id="subjects" className="form__select" showSearch optionFilterProp="children">
                          {subjects &&
                            subjects.length &&
                            subjects.map((subject) => (
                              <React.Fragment key={subject.id}>
                                {subject.value !== '' ? (
                                  <li key={subject.id} value={subject.value}>
                                    {subject.label}
                                  </li>
                                ) : null}
                              </React.Fragment>
                            ))}
                        </select>
                      </div>
                      {name !== 0 ? (
                        <MinusCircleOutlined className="form__add-field-btn" onClick={() => remove(name)} />
                      ) : null}
                      <PlusCircleOutlined className="form__add-field-btn" onClick={() => add()} />
                    </div>
                  ))}
                </>
              )} */}
            </ul>
          </div>
        </div>
      </div>
      <h4 className="register-card__title">Lesson Info</h4>
      <div>
        <div>
          <div className="form__input-field form__input-field--input">
            <input id="lesson-1" name="lesson_1" type="text" className="form__input" />
          </div>
        </div>
        <div>
          <div className="form__input-field form__input-field--input">
            <input id="lesson-5" name="lesson_5" type="text" className="form__input" />
          </div>
        </div>
        <div>
          <div className="form__input-field form__input-field--input">
            <input id="lesson-10" name="lesson_10" type="text" className="form__input" />
          </div>
        </div>
        <div>
          <div className="form__input-field form__input-field--input">
            <input id="lesson-20" name="lesson_20" type="text" className="form__input" />
          </div>
        </div>
        <div>
          <div className="form__input-field form__input-field--select">
            <select id="lesson_duration" className="form__select">
              {lesson_duration &&
                lesson_duration.length &&
                lesson_duration.map((ld) => (
                  <li key={ld.id} value={ld.value}>
                    {ld.label}
                  </li>
                ))}
            </select>
          </div>
        </div>
      </div>
      <div>
        <div>
          {/* <div label="Levels studying" className="form__input-field form__input-field--select">
            <ul name="levels_studying">
              {(fields_levels_studying, { add, remove }) => (
                <>
                  {fields_levels_studying.map(({ key, name, ...restField }) => (
                    <div key={key} style={{ display: 'flex' }} align="baseline" className="space-select">
                      <div
                        {...restField}
                        name={[name, 'levels_studying']}
                        className="form__input-field form__input-field--input"
                      >
                        <select id="levels_studying" className="form__select" showSearch optionFilterProp="children">
                          {levelEducation &&
                            levelEducation.length &&
                            levelEducation.map((le) => (
                              <React.Fragment key={le.id}>
                                {le.value !== '' ? (
                                  <li key={le.id} value={le.value}>
                                    {le.label}
                                  </li>
                                ) : null}
                              </React.Fragment>
                            ))}
                        </select>
                      </div>
                      {name !== 0 ? (
                        <MinusCircleOutlined className="form__add-field-btn" onClick={() => remove(name)} />
                      ) : null}
                      <PlusCircleOutlined className="form__add-field-btn" onClick={() => add()} />
                    </div>
                  ))}
                </>
              )}
            </ul>
          </div>
          <div label="Speaking accent" className="form__input-field form__input-field--select">
            <ul name="speaking_accent">
              {(fields_speaking_accent, { add, remove }) => (
                <>
                  {fields_speaking_accent.map(({ key, name, ...restField }) => (
                    <div key={key} style={{ display: 'flex' }} align="baseline" className="space-select">
                      <div
                        {...restField}
                        name={[name, 'speaking_accent']}
                        className="form__input-field form__input-field--input"
                      >
                        <select id="speaking_accent" className="form__select" showSearch optionFilterProp="children">
                          {speakingAccent &&
                            speakingAccent.length &&
                            speakingAccent.map((sa) => (
                              <React.Fragment key={sa.id}>
                                {sa.value !== '' ? (
                                  <li key={sa.id} value={sa.value}>
                                    {sa.label}
                                  </li>
                                ) : null}
                              </React.Fragment>
                            ))}
                        </select>
                      </div>
                      {name !== 0 ? (
                        <MinusCircleOutlined className="form__add-field-btn" onClick={() => remove(name)} />
                      ) : null}
                      <PlusCircleOutlined className="form__add-field-btn" onClick={() => add()} />
                    </div>
                  ))}
                </>
              )}
            </ul>
          </div>
          <div label="Lesson content" className="form__input-field form__input-field--input">
            <ul name="lesson_content">
              {(fields_lesson_content, { add, remove }) => (
                <>
                  {fields_lesson_content.map(({ key, name, ...restField }) => (
                    <div key={key} style={{ display: 'flex' }} align="baseline" className="space-select">
                      <div
                        {...restField}
                        name={[name, 'lesson_content']}
                        className="form__input-field form__input-field--input"
                      >
                        <input id="lesson_content" name="lesson_content" type="text" className="form__input" />
                      </div>
                      {name !== 0 ? (
                        <MinusCircleOutlined className="form__add-field-btn" onClick={() => remove(name)} />
                      ) : null}
                      <PlusCircleOutlined className="form__add-field-btn" onClick={() => add()} />
                    </div>
                  ))}
                </>
              )}
            </ul>
          </div>
          <div label="Tests" className="form__input-field form__input-field--input">
            <ul name="tests">
              {(fields_tests, { add, remove }) => (
                <>
                  {fields_tests.map(({ key, name, ...restField }) => (
                    <div key={key} style={{ display: 'flex' }} align="baseline" className="space-select">
                      <div {...restField} name={[name, 'tests']} className="form__input-field form__input-field--input">
                        <input id="tests" name="tests" type="text" className="form__input" />
                      </div>
                      {name !== 0 ? (
                        <MinusCircleOutlined className="form__add-field-btn" onClick={() => remove(name)} />
                      ) : null}
                      <PlusCircleOutlined className="form__add-field-btn" onClick={() => add()} />
                    </div>
                  ))}
                </>
              )}
            </ul>
          </div> */}
        </div>
        <div>
          {/* <div label="Education" className="form__input-field form__input-field--input">
            <ul name="education">
              {(fields_education, { add, remove }) => (
                <>
                  {fields_education.map(({ key, name, ...restField }) => (
                    <div key={key} style={{ display: 'flex' }} align="baseline" className="space-select">
                      <div
                        {...restField}
                        name={[name, 'education']}
                        className="form__input-field form__input-field--input"
                      >
                        <input id="education" name="education" type="text" className="form__input" />
                      </div>
                      {name !== 0 ? (
                        <MinusCircleOutlined className="form__add-field-btn" onClick={() => remove(name)} />
                      ) : null}
                      <PlusCircleOutlined className="form__add-field-btn" onClick={() => add()} />
                    </div>
                  ))}
                </>
              )}
            </ul>
          </div>
          <div label="Work experience" className="form__input-field form__input-field--input">
            <ul name="work_experience">
              {(fields_work_experience, { add, remove }) => (
                <>
                  {fields_work_experience.map(({ key, name, ...restField }) => (
                    <div key={key} style={{ display: 'flex' }} align="baseline" className="space-select">
                      <div
                        {...restField}
                        name={[name, 'work_experience']}
                        className="form__input-field form__input-field--input"
                      >
                        <input id="work_experience" name="work_experience" type="text" className="form__input" />
                      </div>
                      {name !== 0 ? (
                        <MinusCircleOutlined className="form__add-field-btn" onClick={() => remove(name)} />
                      ) : null}
                      <PlusCircleOutlined className="form__add-field-btn" onClick={() => add()} />
                    </div>
                  ))}
                </>
              )}
            </ul>
          </div>
          <div label="Certificates" className="form__input-field form__input-field--input">
            <ul name="certificates">
              {(fields_certificates, { add, remove }) => (
                <>
                  {fields_certificates.map(({ key, name, ...restField }) => (
                    <div key={key} style={{ display: 'flex' }} align="baseline" className="space-select">
                      <div
                        {...restField}
                        name={[name, 'certificates']}
                        className="form__input-field form__input-field--input"
                      >
                        <input id="certificates" name="certificates" type="text" className="form__input" />
                      </div>
                      {name !== 0 ? (
                        <MinusCircleOutlined className="form__add-field-btn" onClick={() => remove(name)} />
                      ) : null}
                      <PlusCircleOutlined className="form__add-field-btn" onClick={() => add()} />
                    </div>
                  ))}
                </>
              )}
            </ul>
          </div> */}
        </div>
      </div>
      <div className="form__input-field form__input-field--button">
        <button>Save changes</button>
      </div>
    </form>
  )
}

export default TeacherPrivateDataForm
