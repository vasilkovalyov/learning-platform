import React from 'react'

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
    <form name="sign-up-teacher" autoComplete="off" className="form form-auth form-auth--register">
      <div
        className="form__input-field form__input-field--input"
        // label="Education"
        // name="education"
        // rules={[{ required: true, message: 'Please input your education!' }]}
      >
        <input id="education" name="education" className="form__input" />
      </div>
      <ul>
        {/* {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <div key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <div
                  {...restField}
                  name={[name, 'education_rest']}
                  className="form__input-field form__input-field--input"
                >
                  <input placeholder="Education" />
                </div>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </div>
            ))}
            <div>
              <button type="dashed" onClick={() => add()} icon={<PlusOutlined />} className="form__add-field-btn">
                Add education
              </button>
            </div>
          </>
        )} */}
      </ul>
      <div
        className="form__input-field form__input-field--input"
        // label="Work experience"
        // name="work_experience"
        // rules={[{ required: true, message: 'Please input your work-experience!' }]}
      >
        <input id="work-experience" name="work_experience" className="form__input" />
      </div>
      {/* <ul name="work_experience_rest">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <div key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <div
                  {...restField}
                  name={[name, 'work_experience_rest']}
                  className="form__input-field form__input-field--input"
                >
                  <input placeholder="Work experience" />
                </div>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </div>
            ))}
            <div>
              <button type="dashed" onClick={() => add()} icon={<PlusOutlined />} className="form__add-field-btn">
                Add work experience
              </button>
            </div>
          </>
        )}
      </ul> */}
      <div className="form__input-field form__input-field--button">
        <button>Create account </button>
      </div>
      {validationMessage && <p>{validationMessage}</p>}
    </form>
  )
}

export default TeacherStepThird
