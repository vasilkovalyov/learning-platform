import { IStudentPrivateDataProps } from 'interfaces/student.interface'

export type IStudentPrivateDataEditableProps = Omit<IStudentPrivateDataProps, '_id' | 'user'>
