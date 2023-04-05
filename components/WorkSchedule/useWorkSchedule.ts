import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { IWorkScheduleFormProps, IWorkScheduleFormTimeProps } from './WorkSchedule.type'

type IErrorType = {
  dayFrom: string
  timeFrom: string
}

const defaultWorkSchema: IWorkScheduleFormProps = {
  work_schedule: [
    {
      dayFrom: 0,
      dayTo: 6,
      timeFrom: '08:00',
      timeTo: '22:00',
    },
  ],
}

export function useWorkSchedule(initialData: IWorkScheduleFormProps) {
  const { handleSubmit, control, register, getValues, reset } = useForm<IWorkScheduleFormProps>({
    mode: 'onChange',
    defaultValues: initialData,
  })
  const [errors, setErrors] = useState<IErrorType>({
    dayFrom: '',
    timeFrom: '',
  })

  const {
    fields: scheduleFields,
    remove: removeSchedule,
    append: appendSchedule,
  } = useFieldArray({
    control,
    name: 'work_schedule',
  })

  function handleChange(fieldName: keyof IWorkScheduleFormTimeProps, value: string | number, index: number) {
    const workScheduleArray = getValues('work_schedule')
    const updatedObject: IWorkScheduleFormTimeProps = {
      ...workScheduleArray[index],
      [fieldName]: value,
    }
    const [hourFrom, minuteFrom] = updatedObject.timeFrom.split(':')
    const [hourTo, minuteTo] = updatedObject.timeTo.split(':')

    if (updatedObject.dayFrom > updatedObject.dayTo) {
      setErrors((prev) => {
        return {
          ...prev,
          dayFrom: 'DayFrom shouldn`t be bigger then DayTo',
        }
      })
    } else {
      setErrors((prev) => {
        return {
          ...prev,
          dayFrom: '',
        }
      })
    }
    if (parseInt(hourFrom) + parseInt(minuteFrom) > parseInt(hourTo) + parseInt(minuteTo)) {
      setErrors((prev) => {
        return {
          ...prev,
          timeFrom: 'TimeFrom shouldn`t be less then TimeTo',
        }
      })
    } else {
      setErrors((prev) => {
        return {
          ...prev,
          timeFrom: '',
        }
      })
    }
  }

  function appendRowWorkSchedule(index: number) {
    const itemWork = getValues('work_schedule')[index]
    if (itemWork.dayFrom > itemWork.dayTo || itemWork.timeFrom > itemWork.timeTo) return
    appendSchedule(defaultWorkSchema.work_schedule)
  }

  return {
    errors,
    scheduleFields,
    setErrors,
    handleChange,
    appendRowWorkSchedule,
    reset,
    removeSchedule,
    handleSubmit,
    register,
  }
}
