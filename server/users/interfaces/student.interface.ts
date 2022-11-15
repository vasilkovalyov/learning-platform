import { IPlaceLiving } from "../../interfaces/common"
import { IUser } from './user.interface'


export interface IStudent extends IUser {
  fullname: string
}

export interface IStudentPrivateData extends IPlaceLiving {
  local_time: string
  about_info: string
}