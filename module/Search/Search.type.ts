import { InputHTMLAttributes } from 'react'

export interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  className?: string
}
