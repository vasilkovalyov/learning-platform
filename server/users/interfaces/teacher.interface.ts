import { IPlaceLiving } from "../../interfaces/common"
import { IStudent } from "./student.interface"

export interface ITeacherUser extends IStudent {
  address: string
  education: string[]
  work_experience: string[]
  city: string
  state: string
  country: string
}