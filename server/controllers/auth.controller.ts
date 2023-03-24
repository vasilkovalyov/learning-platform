import AuthService from '../services/auth.service'

class AuthController {
  async signIn(req, res) {
    try {
      const userData = await AuthService.signIn(req.query || req.body)
      res.json(userData)
    } catch (e: any) {
      console.error(e)
      res.status(e.status).json(e)
    }
  }
}

export default new AuthController()
