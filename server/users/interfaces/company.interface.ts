import { IPlaceLiving } from "../../interfaces/common"
import { IStudent } from "./student.interface"

export interface ICompanyUser extends Omit<IStudent, 'fullname'>, IPlaceLiving {
  company_name: string
  inn_code: string
  legal_address: string
  mailing_address: string
  phone: string
}
