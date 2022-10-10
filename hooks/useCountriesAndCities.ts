import { useState } from 'react'
import UniversalCountriesService, { ICountry, IState, ICity } from '../services/universal-countries'

export interface IUseCountriesAndCities {
  countries: ICountry[] | []
  states: IState[] | []
  cities: ICity[] | []
}

export default function useCountriesAndCities(
  initialValue: IUseCountriesAndCities,
): [
  ICountry[],
  IState[],
  ICity[],
  boolean,
  boolean,
  () => Promise<ICountry[]>,
  (value: string) => void,
  (value: string) => void,
] {
  const [countries, setCountries] = useState<ICountry[] | []>(initialValue.countries)
  const [states, setStates] = useState<IState[] | []>(initialValue.states)
  const [cities, setCities] = useState<ICity[] | []>(initialValue.cities)
  const [isLoadingStates, setIsLoadingStates] = useState<boolean>(false)
  const [isLoadingCities, setIsLoadingCities] = useState<boolean>(false)

  async function getCounties() {
    const countries = await UniversalCountriesService.getUniversalDataByType<ICountry>('countries')
    if (!countries) return []
    setCountries(countries)
    return countries
  }

  async function selectCountry(value) {
    setIsLoadingStates(true)
    const states = await UniversalCountriesService.getUniversalDataByType<IState>('states', value)
    states && setStates(states)
    setIsLoadingStates(false)
  }

  async function selectState(value) {
    setIsLoadingCities(true)
    const state = states && states.find((state: IState) => value === state.state_name)
    const cities = await UniversalCountriesService.getUniversalDataByType<ICity>('cities', state?.state_name)
    cities && setCities(cities)
    setIsLoadingCities(false)
  }

  return [countries, states, cities, isLoadingStates, isLoadingCities, getCounties, selectCountry, selectState]
}
