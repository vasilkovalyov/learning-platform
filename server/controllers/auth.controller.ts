import { Request, Response } from 'express'

import authService from '../services/auth.service'

class AuthController {
  async signIn(req: Request, res: Response) {
    try {
      const userData = await authService.signIn(req.query)
      res.json(userData)
    } catch (e: any) {
      res.status(400).json({
        message: e.message,
      })
    }
  }
}

export default new AuthController()
