import UserService from "../services/user.service"
import { UserAccountType } from '../types/common'

class AuthController {
  async signUp(req, res) {
    try {
      // const { role  } = req.body.params
      const { role } = req.query // for postman
      let userData: any = null
      if (role as UserAccountType === 'student') {
        // userData = await UserService.signUpStudent(req.body.params);
        userData = await UserService.signUpStudent(req.query); // for postman
      }
      if (role as UserAccountType === 'teacher') {
        // userData = await UserService.signUpTeacher(req.body.params);
        console.log('req.query', req.query)
        userData = await UserService.signUpTeacher(req.query); // for postman
      }
      res.json(userData);
    } catch(e) {
      res.json(e)
    }
  }

  async signIn(req, res) {
    try {
      // const userData = await UserService.signIn(req.body.params);
      const userData = await UserService.signIn(req.query); // for postman
      console.log('userData', userData)
      res.json(userData);
    } catch(e) {
      console.log(e.message)
      res.json(e)
    }
  }

}

export default new AuthController()