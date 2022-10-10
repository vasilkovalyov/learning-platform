import { IBaseFormTeacherStepSecond } from 'components/forms/TeacherStepSecond'
import { BaseFormStepFirstType } from 'components/forms/BaseFormStepFirst'
import { IFormData } from 'intefaces/auth'
import { useState } from 'react'
import { BaseFormCompanyStepSecondType } from 'components/forms/CompanyStepSecond'

export interface IUseFormAction {
  isLoading: boolean
  validationMessage: string
}

export interface IUserFormSteps<T, W> {
  isSuccessFormFirst?: boolean
  isSuccessFormSecond?: boolean
  isSuccessForms: boolean
  formDataFirst: T | null
  formDataSecond?: W | null
}

export function useFormAction(
  initialValue: IUseFormAction,
): [boolean, string, (value: boolean) => void, (value: string) => void] {
  const [isLoading, setIsLoading] = useState<boolean>(initialValue.isLoading)
  const [validationMessage, setValidationMessage] = useState<string>(initialValue.validationMessage)

  function toggleLoading(value) {
    setIsLoading(value)
  }

  function addValidationMessage(value) {
    setValidationMessage(value)
  }

  return [isLoading, validationMessage, toggleLoading, addValidationMessage]
}

export function useFormSteps<
  T extends BaseFormStepFirstType | IFormData,
  W extends BaseFormCompanyStepSecondType | IBaseFormTeacherStepSecond | null,
>(
  initialValue: IUserFormSteps<T, W>,
): [boolean, () => void, (data: T) => void, (data: W) => void, T, boolean, W, boolean] {
  const [isSuccessForm, setIsSuccessForm] = useState<boolean>(initialValue.isSuccessForms)
  const [isSuccessFormFirst, setIsSuccessFormFirst] = useState<boolean>(initialValue.isSuccessForms)
  const [isSuccessFormSecond, setIsSuccessFormSecond] = useState<boolean>(initialValue.isSuccessForms)
  const [formDataFirst, setFormDataFirst] = useState<T>()
  const [formDataSecond, setFormDataSecond] = useState<W>()

  function successForm() {
    setIsSuccessForm(true)
  }

  function setFormStepFirst(data: T) {
    setIsSuccessFormFirst(true)
    setFormDataFirst(data)
  }
  function setFormStepSecond(data: W) {
    setIsSuccessFormSecond(true)
    setFormDataSecond(data)
  }

  return [
    isSuccessForm,
    successForm,
    setFormStepFirst,
    setFormStepSecond,
    formDataFirst as T,
    isSuccessFormFirst,
    formDataSecond as W,
    isSuccessFormSecond,
  ]
}
