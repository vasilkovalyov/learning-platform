import { ITeacherPrivateDataProps } from 'interfaces/teacher.interface'

export type ITeacherPrivateDataEditableProps = Omit<ITeacherPrivateDataProps, '_id' | 'user'>
