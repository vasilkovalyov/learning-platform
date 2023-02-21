export interface NewsCardProps {
  [x: string]: any
  id: string
  pageListingImage?: {
    url: string
    _id: string
  } | null
  articleDate: string
  title: string
  categoryPages?: PageCategory[] | null
}

export interface PageCategory {
  _id: string
  parent: {
    _id: string
  }
  title: string
  urlSegment: string
}
