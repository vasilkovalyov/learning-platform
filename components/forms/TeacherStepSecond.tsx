import React, { useEffect } from 'react'
import Form from 'antd/lib/form'
import Select from 'antd/lib/select'
import Input from 'antd/lib/input/Input'
import { Button } from 'antd'
import { IFormAddress } from '../../intefaces/auth'

import useCountriesAndCities, { IUseCountriesAndCities } from '../../hooks/useCountriesAndCities'

export interface IBaseFormTeacherStepSecond extends IFormAddress {
  address: string
}

const initialValue: IUseCountriesAndCities = {
  countries: [],
  states: [],
  cities: [],
}

function TeacherStepSecond({
  onSuccess,
}: {
  onSuccess?: (isSuccess: boolean, data: IBaseFormTeacherStepSecond) => void
}) {
  const [form] = Form.useForm()
  const [countries, states, cities, isLoadingStates, isLoadingCities, getCounties, selectCountry, selectState] =
    useCountriesAndCities(initialValue)

  useEffect(() => {
    async function setCountries() {
      const countries = await getCounties()
      form.setFieldsValue({ countries: countries })
    }
    setCountries()
  }, [])

  function onFinish(values: IBaseFormTeacherStepSecond) {
    onSuccess && onSuccess(true, values)
  }

  return (
    <Form
      form={form}
      name="second-step-teacher"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
      className="form-auth form-auth--register form-auth--register-teacher form-auth--register-teacher-2"
    >
      <Form.Item
        label="Country"
        name="country"
        className="form-auth__input-field form-auth__input-field--select"
        rules={[{ required: true, message: 'Please input your country!' }]}
      >
        <Select
          onSelect={(value) => {
            console.log(value)
            selectCountry(value)
          }}
          id="country"
          className="form-auth__select"
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
          filterSort={(optionA, optionB) =>
            (optionA!.children as unknown as string)
              .toLowerCase()
              .localeCompare((optionB!.children as unknown as string).toLowerCase())
          }
        >
          {countries &&
            countries.length &&
            countries.map((country, index) => (
              <Select.Option key={index} value={country.country_name}>
                {country.country_name}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="State"
        name="state"
        className="form-auth__input-field form-auth__input-field--select"
        rules={[{ required: true, message: 'Please input your state!' }]}
      >
        <Select
          loading={isLoadingStates}
          disabled={isLoadingStates}
          onSelect={(value) => selectState(value)}
          id="state"
          className="form-auth__select"
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
          filterSort={(optionA, optionB) =>
            (optionA!.children as unknown as string)
              .toLowerCase()
              .localeCompare((optionB!.children as unknown as string).toLowerCase())
          }
        >
          {states &&
            states.length &&
            states.map((state, index) => (
              <Select.Option key={index} value={state.state_name}>
                {state.state_name}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="City"
        name="city"
        className="form-auth__input-field form-auth__input-field--select"
        rules={[{ required: true, message: 'Please input your city!' }]}
      >
        <Select
          loading={isLoadingCities}
          disabled={isLoadingCities}
          id="city"
          className="form-auth__select"
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
          filterSort={(optionA, optionB) =>
            (optionA!.children as unknown as string)
              .toLowerCase()
              .localeCompare((optionB!.children as unknown as string).toLowerCase())
          }
        >
          {cities &&
            cities.length &&
            cities.map((city, index) => (
              <Select.Option key={index} value={city.city_name}>
                {city.city_name}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        className="form-auth__input-field form-auth__input-field--input"
        label="Address"
        name="address"
        rules={[{ required: true, message: 'Please input your address!' }]}
      >
        <Input id="address" name="address" className="form-auth__input" />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }} className="form-auth__input-field form-auth__input-field--button">
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </Form.Item>
    </Form>
  )
}

export default TeacherStepSecond
