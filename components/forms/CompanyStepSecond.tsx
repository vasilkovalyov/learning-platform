import React, { useEffect } from 'react'

import { IFormAddress, IFormDataCompany } from '../../intefaces/auth'
import useCountriesAndCities, { IUseCountriesAndCities } from '../../hooks/useCountriesAndCities'

export type BaseFormCompanyStepSecondType = IFormDataCompany & IFormAddress

const initialValue: IUseCountriesAndCities = {
  countries: [],
  states: [],
  cities: [],
}

function CompanyStepSecond({
  onSuccess,
  isLoading,
  validationMessage,
}: {
  onSuccess?: (isSuccess: boolean, data: BaseFormCompanyStepSecondType) => void
  isLoading?: boolean
  validationMessage?: string | null
}) {
  // const [form] = Form.useForm()
  const [countries, states, cities, isLoadingStates, isLoadingCities, getCounties, selectCountry, selectState] =
    useCountriesAndCities(initialValue)

  useEffect(() => {
    async function setCountries() {
      const countries = await getCounties()
      // form.setFieldsValue({ countries: countries })
    }
    setCountries()
  }, [])

  function onFinish(values: BaseFormCompanyStepSecondType) {
    onSuccess && onSuccess(true, values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const onChangeCheckbox = (e: any) => {
    // form.setFieldsValue({ mailing_address: form.getFieldValue('legal_address') })
  }

  return (
    <form
      // form={form}
      name="sign-up-company"
      // labelCol={{ span: 24 }}
      //
      // initialValues={{ remember: true }}
      // onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="form form-auth form-auth--register"
    >
      <div
        className="form__input-field form__input-field--input"
        // label="Company name"
        // name="company_name"
        // rules={[{ required: true, message: 'Please input your Company name!' }]}
      >
        <input id="company-name" name="company_name" className="form__input" />
      </div>
      <div
        className="form__input-field form__input-field--input"
        // label="Identification code"
        // name="inn_code"
        // rules={[{ required: true, message: 'Please input your inn code!' }]}
      >
        <input id="inn-code" name="inn_code" className="form__input" />
      </div>
      <div
      // label="Country"
      // name="country"
      // className="form__input-field form__input-field--select"
      // rules={[{ required: true, message: 'Please input your country!' }]}
      >
        {/* <select
          onSelect={(value) => {
            selectCountry(value)
          }}
          id="country"
          className="form__select"
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
              <li key={index} value={country.country_name}>
                {country.country_name}
              </li>
            ))}
        </select> */}
      </div>
      <div
      // label="State"
      // name="state"
      // className="form__input-field form__input-field--select"
      // rules={[{ required: true, message: 'Please input your state!' }]}
      >
        {/* <select
          loading={isLoadingStates}
          disabled={isLoadingStates}
          onSelect={(value) => selectState(value)}
          id="state"
          className="form__select"
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
              <li key={index} value={state.state_name}>
                {state.state_name}
              </li>
            ))}
        </select> */}
      </div>
      <div
      // label="City"
      // name="city"
      // className="form__input-field form__input-field--select"
      // rules={[{ required: true, message: 'Please input your city!' }]}
      >
        {/* <select
          loading={isLoadingCities}
          disabled={isLoadingCities}
          id="city"
          className="form__select"
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
              <li key={index} value={city.city_name}>
                {city.city_name}
              </li>
            ))}
        </select> */}
      </div>
      <div
        className="form__input-field form__input-field--input"
        // label="Legal address"
        // name="legal_address"
        // rules={[{ required: true, message: 'Please input your Legal address!' }]}
      >
        <input id="legal-address" name="legal_address" className="form__input" />
      </div>
      <div
        className="form__input-field form__input-field--input"
        // label="Mailing address"
        // name="mailing_address"
        // rules={[{ required: true, message: 'Please input your Mailing address!' }]}
      >
        <input id="mailing-address" name="mailing_address" className="form__input" />
      </div>
      {/* <Checkbox onChange={onChangeCheckbox}>Matches legal address</Checkbox> */}
      <div className="form__input-field form__input-field--button">
        <button>Create account</button>
      </div>
      {validationMessage && <p>{validationMessage}</p>}
    </form>
  )
}

export default CompanyStepSecond
