import { Request, Response } from 'express'
import studentService from '../services/student.service'

class StudentController {
  async signUp(req: Request, res: Response) {
    try {
      const response = await studentService.signUp(req.body)
      res.json(response).status(200)
    } catch (e: any) {
      res.status(400).json({
        message: e.message,
      })
    }
  }

  async getUserAccountById(req: Request, res: Response) {
    try {
      const response = await studentService.getUserAccountById(req.params.id)
      res.json(response).status(200)
    } catch (e: any) {
      res.status(400).json({
        message: e.message,
      })
    }
  }

  async getUserPrivateDataById(req: Request, res: Response) {
    try {
      const response = await studentService.getUserPrivateDataById(req.params.id)
      res.json(response).status(200)
    } catch (e: any) {
      res.status(400).json({
        message: e.message,
      })
    }
  }

  async updateUserAccount(req: Request, res: Response) {
    try {
      const userData = await studentService.updateUserAccount(req.body)
      res.json(userData)
    } catch (e: any) {
      res.status(400).json({
        message: e.message,
      })
    }
  }

  async updateUserPrivateData(req, res) {
    try {
      const userData = await studentService.updateUserPrivateData(req.body)
      res.json(userData)
    } catch (e: any) {
      console.error(e)
      res.status(e.status).json(e)
    }
  }

  async deleteUserById(req: Request, res: Response) {
    try {
      const response = await studentService.deleteUserById(req.params.id)
      res.json(response).status(200)
      console.log('response', response)
    } catch (e: any) {
      console.log('response error', e)
      res.status(400).json({
        message: e.message,
      })
    }
  }

  async addGroupLesson(req: Request, res: Response) {
    try {
      const response = await studentService.addGroupLesson(req.body.userId, req.body.lessonId)
      res.json(response).status(200)
      console.log('response', response)
    } catch (e: any) {
      console.log('response error', e)
      res.status(400).json({
        message: e.message,
      })
    }
  }
}

export default new StudentController()
