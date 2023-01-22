export interface WorkExperienceFormProps {
  onSubmit: (data: WorkExperienceProps) => void
  initialData: WorkExperienceProps | null
}

export interface WorkExperienceProps {
  company_name: string
  position: string
  place_destination: string
  start_month_working: string
  start_year_working: string
  end_month_working: string
  end_year_working: string
}
