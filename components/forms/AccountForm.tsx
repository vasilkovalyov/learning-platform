import React, { useEffect } from 'react'
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
  useEffect(() => {
    if (!formData) return
    // form.setFieldsValue(formData)
  }, [formData])

  function onFinish<T>(values: T) {
    onSuccess && onSuccess(true, values)
  }

  return (
    <form name="account-user" autoComplete="off" className="form form-admin">
      {role === 'teacher' || role === 'student' ? (
        <div
          className="form__input-field form__input-field--input"
          // name="fullname"
          // label="Full name"
          // rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <input id="fullname" name="fullname" type="text" className="form__input" />
        </div>
      ) : null}
      <div
        className="form__input-field form__input-field--input"
        // name="login"
        // label="Login"
        // rules={[{ required: true, message: 'Please input your login!' }]}
      >
        <input id="login" name="login" className="form__input" />
      </div>
      {role === 'company' ? (
        <div
          className="form__input-field form__input-field--input"
          // label="Company name"
          // name="company_name"
          // rules={[{ required: true, message: 'Please input your Company name!' }]}
        >
          <input id="company-name" name="company_name" className="form__input" />
        </div>
      ) : null}

      <div className="form__input-field form__input-field--password">
        <input id="password" name="password" className="form__input" />
      </div>
      <div
        className="form__input-field form__input-field--input"
        // name="email"
        // label="Email"
        // rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}
      >
        <input id="email" name="email" type="email" className="form__input" />
      </div>
      <div
        className="form__input-field form__input-field--input"
        // name="phone"
        // label="Phone"
        // rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <input id="phone" name="phone" className="form__input" />
      </div>
      {validationMessage && <p>{validationMessage}</p>}
      <div className="form__input-field form__input-field--button">
        <button>Save changes</button>
      </div>
    </form>
  )
}

export default AccountForm
