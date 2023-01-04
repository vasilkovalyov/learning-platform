import React from 'react'
import { IFormData, IFormDataCompany } from '../../intefaces/auth'
import { RoleType } from '../../types/common'

export type BaseFormStepFirstType = IFormData & Pick<IFormDataCompany, 'phone'>

function BaseFormStepFirst({
  onSuccess,
  type,
}: {
  onSuccess?: (isSuccess: boolean, data: BaseFormStepFirstType) => void
  type: RoleType
}) {
  function onFinish(values: BaseFormStepFirstType) {
    onSuccess && onSuccess(true, values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <form name="base-from-step" autoComplete="off" className="form form-auth form-auth-form--register">
      {type !== 'company' ? (
        <div
          className="form__input-field form__input-field--input"
          // name="fullname"
          // label="Full name"
          // rules={[{ required: true, message: 'Please input your full name!' }]}
        >
          <input id="fullname" name="fullname" />
        </div>
      ) : null}
      <div
        className="form__input-field form__input-field--input"
        // name="login"
        // label="Login"
        // rules={[{ required: true, message: 'Please input your login!' }]}
      >
        <input id="login" name="login" />
      </div>
      <div
        className="form__input-field form__input-field--input"
        // name="email"
        // label="Email"
        // rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}
      >
        <input id="email" name="email" />
      </div>
      <div
        className="form__input-field form__input-field--password"
        // label="Password"
        // name="password"
        // rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <input id="password" name="password" className="form__input" />
      </div>
      <div
        className="form__input-field form__input-field--password form__input-field--confirm-password"
        // name="confirm_password"
        // label="Confirm Password"
        // dependencies={['password']}
        // hasFeedback
        // rules={[
        //   {
        //     required: true,
        //     message: 'Please confirm your password!',
        //   },
        //   ({ getFieldValue }) => ({
        //     validator(_, value) {
        //       if (!value || getFieldValue('password') === value) {
        //         return Promise.resolve()
        //       }
        //       return Promise.reject(new Error('The two passwords that you entered do not match!'))
        //     },
        //   }),
        // ]}
      >
        <input id="confirm-password" name="confirm_password" />
      </div>
      <div
        className="form__input-field form__input-field--input"
        // name="phone"
        // label="Phone Number"
        // rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <input id="phone" name="phone" />
      </div>
      <div className="form__input-field form__input-field--button">
        <button>Next</button>
      </div>
    </form>
  )
}

export default BaseFormStepFirst
