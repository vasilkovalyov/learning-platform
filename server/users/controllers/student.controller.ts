import { ISignUpUserResponse } from '../../interfaces/auth-user.interface'
import StudentService from '../services/student.service'

class StudentController {
  async signUp(req, res) {
    try {
      let userData: ISignUpUserResponse
      userData = await StudentService.signUp(req.body.params || req.body)
      res.json(userData)
    } catch (e) {
      console.error(e)
      res.status(e.status).json(e)
    }
  }

  async getUserById(req, res) {
    try {
      const userData = await StudentService.getUserById(req.params.id)
      res.json(userData)
    } catch (e) {
      console.error(e)
      res.status(e.status).json(e)
    }
  }
}

export default new StudentController()
