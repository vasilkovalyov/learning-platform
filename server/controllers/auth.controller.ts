import UserService from "../services/user.service"

class AuthController {
  async signUp(req, res, next) {
    try {
      const { role } = req.body.params
      let userData: any = null
      if (role === 'student') {
        userData = await UserService.signUpStudent(req.body.params);
      }
      res.json(userData);
    } catch(e) {
      console.log(e.message)
      next(e)
    }
  }

  async signIn(req, res, next) {
    try {
      const data = await UserService.signIn(req.body.params);
      
      res.json({ ...data });
      res.status(data.status)
    } catch(e) {
      console.log(e.message)
      next(e)
    }
  }

}

export default new AuthController()