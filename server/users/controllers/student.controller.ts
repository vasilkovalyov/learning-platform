import { ISignUpUserResponse } from '../../interfaces/auth-user.interface'
import { StudentPrivateDataModel } from '../models/student/private-data.student'
import StudentService from '../services/student.service'

class StudentController {
  async signUp(req, res) {
    try {
      let userData: ISignUpUserResponse
      userData = await StudentService.signUp(req.query)
      res.json(userData)
    } catch (e: any) {
      console.error(e)
      res.status(e.status).json(e)
    }
  }

  async getUserById(req, res) {
    try {
      const userData = await StudentService.getUserById(req.params.id)
      res.json(userData)
    } catch (e: any) {
      console.error(e)
      res.status(e.status).json(e)
    }
  }

  async updateUserAccount(req, res) {
    try {
      const userData = await StudentService.updateUserAccount(req.body.params || req.body)
      res.json(userData)
    } catch (e: any) {
      console.error(e)
      res.status(e.status).json(e)
    }
  }

  async updateUserPrivateData(req, res) {
    try {
      const userData = await StudentService.updateUserPrivateData(req.body.params || req.query)
      res.json(userData)
    } catch (e: any) {
      console.error(e)
      res.status(e.status).json(e)
    }
  }

  async getUserPrivateData(req, res) {
    try {
      const userData = await StudentService.getUserPrivateData(req.params.id)
      res.json(userData)
    } catch (e: any) {
      console.error(e)
      res.status(e.status).json(e)
    }
  }

  async removeUser(req, res) {
    try {
      const response = await StudentService.removeUser(req.query.id)
      res.json(response).status(200)
    } catch (e: any) {
      res.status(e.status).json(e)
    }
  }
}

export default new StudentController()
