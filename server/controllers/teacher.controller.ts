import { Request, Response } from 'express'
import studentService from '../services/teacher.service'

class TeacherController {
  async signUp(req: Request, res: Response) {
    try {
      const response = await studentService.signUp(req.body)
      console.log('response', response)
      res.json(response).status(200)
    } catch (e) {
      res.status(400).json({
        message: e.message,
      })
    }
  }

  async getUserAccountById(req: Request, res: Response) {
    try {
      const response = await studentService.getUserAccountById(req.params.id)
      res.json(response).status(200)
    } catch (e) {
      res.status(400).json({
        message: e.message,
      })
    }
  }

  async getUserPrivateDataById(req: Request, res: Response) {
    try {
      const response = await studentService.getUserPrivateDataById(req.params.id)
      res.json(response).status(200)
    } catch (e) {
      res.status(400).json({
        message: e.message,
      })
    }
  }

  async updateUserAccount(req: Request, res: Response) {
    try {
      console.log(req)
      const userData = await studentService.updateUserAccount(req.body)
      res.json(userData)
    } catch (e) {
      res.status(400).json({
        message: e.message,
      })
    }
  }

  async updateUserPrivateData(req, res) {
    try {
      const userData = await studentService.updateUserPrivateData(req.body)
      res.json(userData)
    } catch (e) {
      console.error(e)
      res.status(e.status).json(e)
    }
  }

  async deleteUserById(req: Request, res: Response) {
    try {
      const response = await studentService.deleteUserById(req.params.id)
      res.json(response).status(200)
      console.log('response', response)
    } catch (e) {
      console.log('response error', e)
      res.status(400).json({
        message: e.message,
      })
    }
  }
}

export default new TeacherController()
