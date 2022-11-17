import { IPlaceLiving } from "../../interfaces/common"
import { IUser } from './user.interface'


export interface IStudent extends IUser {
  fullname: string
}

export interface IStudentPrivateData extends IPlaceLiving {
  local_time: number
  about_info: string
}