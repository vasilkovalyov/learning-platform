import React, { useEffect } from 'react'
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

  function onFinish(values: IBaseFormTeacherStepSecond) {
    onSuccess && onSuccess(true, values)
  }

  return (
    <form name="second-step-teacher" autoComplete="off" className="form form-auth form-auth--register">
      <div
      // label="Country"
      // name="country"
      // className="form__input-field form__input-field--select"
      // rules={[{ required: true, message: 'Please input your country!' }]}
      >
        <select
          onSelect={(value) => {
            // selectCountry(value)
          }}
          id="country"
          className="form__select"
          // showSearch
          // optionFilterProp="children"
          // filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
          // filterSort={(optionA, optionB) =>
          //   (optionA!.children as unknown as string)
          //     .toLowerCase()
          //     .localeCompare((optionB!.children as unknown as string).toLowerCase())
          // }
        >
          {countries &&
            countries.length &&
            countries.map((country, index) => (
              <li key={index} value={country.country_name}>
                {country.country_name}
              </li>
            ))}
        </select>
      </div>
      <div
      // label="State"
      // name="state"
      // className="form__input-field form__input-field--select"
      // rules={[{ required: true, message: 'Please input your state!' }]}
      >
        <select
          // loading={isLoadingStates}
          disabled={isLoadingStates}
          // onSelect={(value) => selectState(value)}
          id="state"
          className="form__select"
          // showSearch
          // optionFilterProp="children"
          // filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
          // filterSort={(optionA, optionB) =>
          //   (optionA!.children as unknown as string)
          //     .toLowerCase()
          //     .localeCompare((optionB!.children as unknown as string).toLowerCase())
          // }
        >
          {states &&
            states.length &&
            states.map((state, index) => (
              <li key={index} value={state.state_name}>
                {state.state_name}
              </li>
            ))}
        </select>
      </div>
      <div
      // label="City"
      // name="city"
      // className="form__input-field form__input-field--select"
      // rules={[{ required: true, message: 'Please input your city!' }]}
      >
        <select
        // loading={isLoadingCities}
        // disabled={isLoadingCities}
        // id="city"
        // className="form__select"
        // showSearch
        // optionFilterProp="children"
        // filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
        // filterSort={(optionA, optionB) =>
        //   (optionA!.children as unknown as string)
        //     .toLowerCase()
        //     .localeCompare((optionB!.children as unknown as string).toLowerCase())
        // }
        >
          {cities &&
            cities.length &&
            cities.map((city, index) => (
              <li key={index} value={city.city_name}>
                {city.city_name}
              </li>
            ))}
        </select>
      </div>
      <div
        className="form__input-field form__input-field--input"
        // label="Address"
        // name="address"
        // rules={[{ required: true, message: 'Please input your address!' }]}
      >
        <input id="address" name="address" className="form__input" />
      </div>
      <div className="form__input-field form__input-field--button">
        <button>Next</button>
      </div>
    </form>
  )
}

export default TeacherStepSecond
