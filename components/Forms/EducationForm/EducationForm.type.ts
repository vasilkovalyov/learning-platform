export interface EducationFormProps {
  onSubmit: (data: EducationProps) => void
  initialData: EducationProps | null
}

export interface EducationProps {
  university_name: string
  faculty: string
  specialization: string
  start_month_education: string
  start_year_education: string
  end_month_education: string
  end_year_education: string
}
