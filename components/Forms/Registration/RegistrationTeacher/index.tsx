import React, { useState } from 'react'

import cn from 'classnames'

import Grid from '@mui/material/Grid'

import {
  RegistrationTeacherFormDataStepOne,
  RegistrationTeacherFormDataStepThree,
  RegistrationTeacherFormDataStepTwo,
  RegistrationTeacherFullProps,
  RegistrationTeacherProps,
} from './RegistrationTeacher.type'

import ContainerWithShadow from 'components/Generic/ContainerWithShadow'

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
  const [step, setStep] = useState<number>(1)
  const [formData, setFormData] = useState<RegistrationTeacherFullProps>(initialData)

  function submitFormStepOne(props: RegistrationTeacherFormDataStepOne) {
    setFormData((prevState) => ({
      ...prevState,
      ...props,
    }))
    setStep(step + 1)
  }

  function submitFormStepTwo(props: RegistrationTeacherFormDataStepTwo) {
    setFormData((prevState) => ({
      ...prevState,
      ...props,
    }))
    setStep(step + 1)
  }

  function submitFormStepThree(props: RegistrationTeacherFormDataStepThree) {
    const education = props.education.map((item) => item.value)
    const work_experience = props.work_experience.map((item) => item.value)
    setFormData((prevState) => ({
      ...prevState,
      education,
      work_experience,
    }))

    onSubmit({
      ...formData,
      education,
      work_experience,
    })
  }

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} md={4}>
        <ContainerWithShadow className="container--registration form-step">
          <RegistrationTeacherStepFirst
            submitForm={submitFormStepOne}
            disable={step > 1}
            closeDisable={() => setStep(1)}
          />
        </ContainerWithShadow>
      </Grid>
      <Grid item xs={12} md={4} className={cn({ 'form-step--hide': step < 2 })}>
        <ContainerWithShadow className={cn('container--registration orm-step')}>
          <RegistrationTeacherStepSecond
            submitForm={submitFormStepTwo}
            disable={step > 2}
            closeDisable={() => setStep(2)}
          />
        </ContainerWithShadow>
      </Grid>
      <Grid item xs={12} md={4} className={cn({ 'form-step--hide': step < 3 })}>
        <ContainerWithShadow className={cn('container--registration form-step')}>
          <RegistrationTeacherStepThird
            submitForm={submitFormStepThree}
            validationMessage={validationMessage}
            isLoading={isLoading}
          />
        </ContainerWithShadow>
      </Grid>
    </Grid>
  )
}

export default RegistrationTeacher
