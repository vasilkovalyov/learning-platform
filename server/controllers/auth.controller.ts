import UserService from "../services/auth.service"
import { UserAccountType } from '../types/common'
import { sendConfirmationEmail } from '../mailer'

class AuthController {
  async activateUser(req, res) {
    const { hash } = req.params
    try {
      await UserService.activateUser(hash);
      res.redirect(process.env.API_URL);
    } catch(e) {
      res.json(e)
    }
  }

  async signUp(req, res) {
    try {
      const { role  } = req.body.params // for prod
      // const { role } = req.query // for postman
      let userData: any = null
      if (role as UserAccountType === 'student') {
        userData = await UserService.signUpStudent(req.body.params); // for prod
        // userData = await UserService.signUpStudent(req.query); // for postman
      }
      if (role as UserAccountType === 'teacher') {
        userData = await UserService.signUpTeacher(req.body.params); // for prod
        // userData = await UserService.signUpTeacher(req.query); // for postman
      }
      if (role as UserAccountType === 'company') {
        userData = await UserService.signUpCompany(req.body.params); // for prod
        // userData = await UserService.signUpCompany(req.query); // for postman
      }

      // temp don`t remove!!!
      // await sendConfirmationEmail({
      //   email: userData.data.email,
      //   hash: userData.data._id
      // })
      res.json(userData);
    } catch(e) {
      console.error(e)
      res.status(e.status).json(e)
    }
  }

  async signIn(req, res) {
    try {
      const userData = await UserService.signIn(req.body.params); // for prod
      // const userData = await UserService.signIn(req.query); // for postman
      res.json(userData);
    } catch(e) {
      console.error(e)
      res.status(e.status).json(e)
    }
  }

  async getUserById(req, res) {
    try {
      const userData = await UserService.getUserById(req.params.id)
      res.json(userData);
    } catch(e) {
      console.error(e)
      res.status(e.status).json(e)
    }
  }

}

export default new AuthController()