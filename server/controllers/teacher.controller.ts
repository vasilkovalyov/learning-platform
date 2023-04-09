import { Request, Response } from 'express'
import teacherService from '../services/teacher.service'

class TeacherController {
  async signUp(req: Request, res: Response) {
    try {
      const response = await teacherService.signUp(req.body)
      console.log('response', response)
      res.json(response).status(200)
    } catch (e: any) {
      res.status(400).json({
        message: e.message,
      })
    }
  }

  async getUserAccountById(req: Request, res: Response) {
    try {
      const response = await teacherService.getUserAccountById(req.params.id)
      res.json(response).status(200)
    } catch (e: any) {
      res.status(400).json({
        message: e.message,
      })
    }
  }

  async getUserPrivateDataById(req: Request, res: Response) {
    try {
      const response = await teacherService.getUserPrivateDataById(req.params.id)
      res.json(response).status(200)
    } catch (e: any) {
      res.status(400).json({
        message: e.message,
      })
    }
  }

  async updateUserAccount(req: Request, res: Response) {
    try {
      const userData = await teacherService.updateUserAccount(req.body)
      res.json(userData)
    } catch (e: any) {
      res.status(400).json({
        message: e.message,
      })
    }
  }

  async updateUserPrivateData(req, res) {
    try {
      const userData = await teacherService.updateUserPrivateData(req.body)
      res.json(userData)
    } catch (e: any) {
      console.error(e)
      res.status(e.status).json(e)
    }
  }

  async deleteUserById(req: Request, res: Response) {
    try {
      const response = await teacherService.deleteUserById(req.params.id)
      res.json(response).status(200)
    } catch (e: any) {
      console.log('response error', e)
      res.status(400).json({
        message: e.message,
      })
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const response = await teacherService.getUsers()
      res.json(response).status(200)
    } catch (e: any) {
      res.status(400).json({
        message: e.message,
      })
    }
  }

  async getUserProfileInfo(req: Request, res: Response) {
    try {
      const response = await teacherService.getUserProfileInfo(req.params.id)
      res.json(response).status(200)
    } catch (e: any) {
      res.status(400).json({
        message: e.message,
      })
    }
  }

  async createGroupLesson(req: Request, res: Response) {
    try {
      const response = await teacherService.createGroupLesson(req.body)
      res.json(response).status(200)
    } catch (e: any) {
      res.status(400).json({
        message: e.message,
      })
    }
  }

  async deleteGroupLesson(req: Request, res: Response) {
    try {
      const response = await teacherService.deleteGroupLesson(req.body.userId, req.body.lessonId)
      res.json(response).status(200)
    } catch (e: any) {
      res.status(400).json({
        message: e.message,
      })
    }
  }

  async updateGroupLesson(req: Request, res: Response) {
    try {
      const response = await teacherService.updateGroupLesson(req.body)
      res.json(response).status(200)
    } catch (e: any) {
      res.status(400).json({
        message: e.message,
      })
    }
  }

  async getGroupLessonsMe(req: Request, res: Response) {
    try {
      const response = await teacherService.getGroupLessonsMe(req.params.id)
      res.json(response).status(200)
    } catch (e: any) {
      res.status(400).json({
        message: e.message,
      })
    }
  }
}

export default new TeacherController()
