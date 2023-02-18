import { ImageProps } from '../Image/Image.type'

export interface NewsCardProps {
  id: string
  image: ImageProps
  articleDate: string
  title: string
  caterories: string[]
}
