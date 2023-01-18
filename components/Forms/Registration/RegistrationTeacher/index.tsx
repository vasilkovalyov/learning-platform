import React, { useState } from 'react'

import cn from 'classnames'

import Grid from '@mui/material/Grid'

import {
  RegistrationTeacherFullProps,
  RegistrationTeacherProps,
  TextFieldStepFirstType,
  TextFieldStepSecondType,
} from './RegistrationTeacher.type'

import ContainerWithShadow from 'components/Generic/ContainerWithShadow'

import { RegistrationTeacherFormThirdProps } from './RegistrationTeacher.type'

import RegistrationTeacherStepFirst, { initialData as stepFirstInitialData } from './RegistrationTeacherStepFirst'
import RegistrationTeacherStepSecond, { initialData as stepSecondInitialData } from './RegistrationTeacherStepSecond'
import RegistrationTeacherStepThird from './RegistrationTeacherStepThird'

const initialData: RegistrationTeacherFullProps = {
  ...stepFirstInitialData,
  ...stepSecondInitialData,
  education: [],
  work_experience: [],
}

function RegistrationTeacher({ isLoading, validationMessage, onSubmit }: RegistrationTeacherProps) {
  const totalSteps = 3
  const [step, setStep] = useState<number>(1)
  const [isStepTwo, setIsStepTwo] = useState<boolean>(false)
  const [isStepThree, setIsStepThree] = useState<boolean>(false)

  const [formData, setFormData] = useState<RegistrationTeacherFullProps>(initialData)

  const formInputStepOne: TextFieldStepFirstType[] = [
    'fullname',
    'login',
    'email',
    'password',
    'confirm_password',
    'phone',
  ]
  const formInputStepTwo: TextFieldStepSecondType[] = ['country', 'state', 'city', 'address']

  function nextStep() {
    if (step < totalSteps) {
      setStep(step + 1)
    }
    if (step + 1 === 2) {
      setIsStepTwo(true)
    }
    if (step + 1 === 3) {
      setIsStepThree(true)
    }
  }

  function finalStep(data: RegistrationTeacherFormThirdProps) {
    setFormData((prevState) => ({
      ...prevState,
      ...data,
    }))

    onSubmit({
      ...formData,
      ...data,
    })
  }

  const handleInputData = (name: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} md={4}>
        <ContainerWithShadow className="container--registration form-step">
          <RegistrationTeacherStepFirst
            inputFields={formInputStepOne}
            nextStep={nextStep}
            handleFormData={handleInputData}
            values={formData}
          />
        </ContainerWithShadow>
      </Grid>
      <Grid item xs={12} md={4} className={cn({ 'form-step--hide': !isStepTwo })}>
        <ContainerWithShadow className={cn('container--registration orm-step')}>
          <RegistrationTeacherStepSecond
            inputFields={formInputStepTwo}
            nextStep={nextStep}
            handleFormData={handleInputData}
            values={formData}
          />
        </ContainerWithShadow>
      </Grid>
      <Grid item xs={12} md={4} className={cn({ 'form-step--hide': !isStepThree })}>
        <ContainerWithShadow className={cn('container--registration form-step')}>
          <RegistrationTeacherStepThird
            handleFormData={handleInputData}
            validationMessage={validationMessage}
            isLoading={isLoading}
            finalStep={finalStep}
            values={formData}
          />
        </ContainerWithShadow>
      </Grid>
    </Grid>
  )
}

export default RegistrationTeacher
