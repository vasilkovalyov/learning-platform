export interface FilterTagsProps {
  tags:
    | {
        id: string
        title: string
      }[]
    | []
  onClick?: (id: string) => void
}
