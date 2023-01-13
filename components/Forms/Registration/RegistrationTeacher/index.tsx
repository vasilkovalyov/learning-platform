import React, { useState } from 'react'

import cn from 'classnames'

import { RegistrationTeacherFullProps, RegistrationTeacherProps } from './RegistrationTeacher.type'

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

  const formInputStepOne = ['fullname', 'login', 'email', 'password', 'confirm_password', 'phone']
  const formInputStepTwo = ['country', 'state', 'city', 'address']

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

  function finalStep(data) {
    setFormData((prevState) => ({
      ...prevState,
      ...data,
    }))

    onSubmit({
      ...formData,
      ...data,
    })
  }

  const handleInputData = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <div>
      <div className="form-step">
        <RegistrationTeacherStepFirst
          inputFields={formInputStepOne}
          nextStep={nextStep}
          handleFormData={handleInputData}
          values={formData}
        />
      </div>
      <div className={cn('form-step', { 'form-step--hide': !isStepTwo })}>
        <RegistrationTeacherStepSecond
          inputFields={formInputStepTwo}
          nextStep={nextStep}
          handleFormData={handleInputData}
          values={formData}
        />
      </div>
      <div className={cn('form-step', { 'form-step--hide': !isStepThree })}>
        <RegistrationTeacherStepThird
          handleFormData={handleInputData}
          validationMessage={validationMessage}
          isLoading={isLoading}
          finalStep={finalStep}
          values={formData}
        />
      </div>
    </div>
  )
}

export default RegistrationTeacher
