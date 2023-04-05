export interface IWorkScheduleProps {
  onSave?: () => void
  onReset?: () => void
  initialData?: IWorkScheduleFormProps
}

export interface IWorkScheduleFormProps {
  work_schedule: IWorkScheduleFormTimeProps[]
}

export interface IWorkScheduleFormTimeProps {
  dayFrom: number
  dayTo: number
  timeFrom: string
  timeTo: string
}
