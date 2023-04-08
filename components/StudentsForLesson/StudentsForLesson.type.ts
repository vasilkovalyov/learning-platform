export interface IStudentsForLessonProps {
  message: string
  students: IStudentForLessonProps[] | []
  onChangeStudent: (students: IStudentForLessonProps[] | []) => void
  excludeStudent?: (id: string) => void
}

export interface IStudentForLessonProps {
  _id: string
  fullname: string
  imageSrc?: string
}
