import AuthService from '../services/auth.service'

class AuthController {
  // async activateUser(req, res) {
  //   const { hash } = req.params
  //   try {
  //     await AuthService.activateUser(hash);
  //     // res.redirect(process.env.API_URL); // temp don`t remove!!!
  //   } catch(e) {
  //     res.json(e)
  //   }
  // }

  async signIn(req, res) {
    try {
      const userData = await AuthService.signIn(req.body.params) // for prod
      // const userData = await AuthService.signIn(req.query); // for postman
      res.json(userData)
    } catch (e: any) {
      console.error(e)
      res.status(e.status).json(e)
    }
  }
}

export default new AuthController()
