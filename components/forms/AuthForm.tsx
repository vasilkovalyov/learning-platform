import React from 'react'
import { IFormData } from '../../intefaces/auth'

export type AuthFormData = Pick<IFormData, 'email' | 'password'>

function AuthForm({
  onSuccess,
  isLoading,
  validationMessage,
}: {
  onSuccess?: (isSuccess: boolean, data: AuthFormData) => void
  isLoading?: boolean
  validationMessage?: string | null
}) {
  function onFinish(values: AuthFormData) {
    onSuccess && onSuccess(true, values)
  }

  return (
    <form name="auth-user" autoComplete="off" className="form form-auth">
      <div
        className="form__input-field form__input-field--input"
        // name="email"
        // label="Email"
        // rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}
      >
        <input id="email" name="email" type="email" />
      </div>
      <div
        className="form__input-field form__input-field--password"
        // label="Password"
        // name="password"
        // rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <input id="password" name="password" className="form__input" />
      </div>
      {validationMessage && <p>{validationMessage}</p>}
      <div className="form__input-field form__input-field--button">
        <button>Sign in</button>
      </div>
    </form>
  )
}

export default AuthForm
