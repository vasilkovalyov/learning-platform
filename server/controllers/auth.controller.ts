import UserService from "../services/user.service"

class AuthController {
  async signUp(req, res) {
    try {
      const { role } = req.body.params
      // const { role } = req.query
      let userData: any = null
      if (role === 'student') {
        userData = await UserService.signUpStudent(req.body.params);
        // userData = await UserService.signUpStudent(req.query);
      }
      res.json(userData);
    } catch(e) {
      res.json(e)
    }
  }

  async signIn(req, res) {
    try {
      const userData = await UserService.signIn(req.body.params);
      // const userData = await UserService.signIn(req.query);
      res.json(userData);
    } catch(e) {
      console.log(e.message)
      res.json(e)
    }
  }

}

export default new AuthController()