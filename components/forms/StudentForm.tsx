import React from 'react'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input/Input'
import Password from 'antd/lib/input/Password'
import Typography from 'antd/lib/typography'
import { Button } from 'antd'

const { Text } = Typography

function AuthForm() {
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="form-auth form-auth--register"
    >
      <Form.Item
        className="form-auth__input-field form-auth__input-field--input"
        label="Login"
        name="login"
        rules={[{ required: true, message: 'Please input your login!' }]}
      >
        <Input id="login" name="login" className="form-auth__input" />
      </Form.Item>
      <Form.Item
        className="form-auth__input-field form-auth__input-field--password"
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Password id="password" name="password" className="form-auth__input" />
      </Form.Item>
      <Form.Item
        className="form-auth__input-field form-auth__input-field--password form-auth__input-field--confirm-password"
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'))
            },
          }),
        ]}
      >
        <Password />
      </Form.Item>
      <Form.Item
        className="form-auth__input-field form-auth__input-field--input"
        name={['user', 'email']}
        label="Email"
        rules={[{ type: 'email' }]}
      >
        <Input id="email" name="email" />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }} className="form-auth__input-field form-auth__input-field--button">
        <Button type="primary">Sign up</Button>
      </Form.Item>
      <Typography className="form-auth__message">
        <Text>You can sing up by usingh social network</Text>
      </Typography>
      <ul className="social-network-sing-up">
        <li className="social-network-sing-up__item">
          <Button className="social-network-sing-up__btn">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_132_283)">
                <path
                  d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
                  fill="#3B5998"
                />
                <path
                  d="M20.023 16.6262H17.168V27.0856H12.8424V16.6262H10.7852V12.9504H12.8424V10.5717C12.8424 8.87066 13.6504 6.20703 17.2065 6.20703L20.4106 6.22044V9.78848H18.0858C17.7045 9.78848 17.1683 9.979 17.1683 10.7904V12.9538H20.4009L20.023 16.6262Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_132_283">
                  <rect width="32" height="32" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Button>
        </li>
        <li className="social-network-sing-up__item">
          <Button className="social-network-sing-up__btn">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_132_287)">
                <path
                  d="M7.09188 19.3377L5.978 23.496L1.90681 23.5821C0.690125 21.3254 0 18.7435 0 15.9997C0 13.3465 0.64525 10.8445 1.789 8.64148H1.78988L5.41438 9.30598L7.00213 12.9087C6.66981 13.8775 6.48869 14.9175 6.48869 15.9997C6.48881 17.1742 6.70156 18.2995 7.09188 19.3377Z"
                  fill="#FBBB00"
                />
                <path
                  d="M31.7203 13.011C31.904 13.9789 31.9998 14.9785 31.9998 16C31.9998 17.1455 31.8794 18.2629 31.6499 19.3407C30.8711 23.0084 28.8359 26.211 26.0166 28.4774L26.0157 28.4765L21.4504 28.2436L20.8043 24.2102C22.6751 23.113 24.1371 21.3961 24.9072 19.3407H16.3516V13.011H25.032H31.7203Z"
                  fill="#518EF8"
                />
                <path
                  d="M26.0152 28.4764L26.0161 28.4773C23.2742 30.6812 19.7911 31.9999 15.9994 31.9999C9.90625 31.9999 4.60869 28.5942 1.90625 23.5823L7.09131 19.338C8.4425 22.9441 11.9212 25.5111 15.9994 25.5111C17.7524 25.5111 19.3946 25.0373 20.8038 24.21L26.0152 28.4764Z"
                  fill="#28B446"
                />
                <path
                  d="M26.2128 3.6835L21.0295 7.927C19.5711 7.01538 17.8471 6.48875 16.0001 6.48875C11.8295 6.48875 8.28575 9.17356 7.00225 12.909L1.78994 8.64175H1.78906C4.45194 3.50769 9.81631 0 16.0001 0C19.8822 0 23.4418 1.38287 26.2128 3.6835Z"
                  fill="#F14336"
                />
              </g>
              <defs>
                <clipPath id="clip0_132_287">
                  <rect width="32" height="32" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Button>
        </li>
        <li className="social-network-sing-up__item">
          <Button className="social-network-sing-up__btn">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_132_292)">
                <path
                  d="M16 31.999C24.8366 31.999 32 24.8356 32 15.999C32 7.16247 24.8366 -0.000976562 16 -0.000976562C7.16344 -0.000976562 0 7.16247 0 15.999C0 24.8356 7.16344 31.999 16 31.999Z"
                  fill="#007AB9"
                />
                <path
                  d="M25.5603 17.287V23.8835H21.7359V17.7291C21.7359 16.1838 21.1837 15.1285 19.799 15.1285C18.7423 15.1285 18.1145 15.839 17.8373 16.5269C17.7366 16.7728 17.7106 17.1142 17.7106 17.459V23.8832H13.8859C13.8859 23.8832 13.9373 13.4597 13.8859 12.3808H17.7109V14.0108C17.7032 14.0236 17.6924 14.0362 17.6856 14.0484H17.7109V14.0108C18.2192 13.2287 19.1256 12.1107 21.1578 12.1107C23.6739 12.1107 25.5603 13.7546 25.5603 17.287ZM9.88492 6.83618C8.57663 6.83618 7.7207 7.69496 7.7207 8.82328C7.7207 9.92763 8.55182 10.8112 9.83472 10.8112H9.85953C11.1935 10.8112 12.0229 9.92763 12.0229 8.82328C11.9975 7.69496 11.1935 6.83618 9.88492 6.83618ZM7.94802 23.8835H11.7713V12.3808H7.94802V23.8835Z"
                  fill="#F1F2F2"
                />
              </g>
              <defs>
                <clipPath id="clip0_132_292">
                  <rect width="32" height="32" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Button>
        </li>
      </ul>
    </Form>
  )
}

export default AuthForm
