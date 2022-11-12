import { RoleType } from "../../../types/common"

export interface IStudent {
  _id: string
  login: string
  email: string
  role: RoleType
  phone?: string
}