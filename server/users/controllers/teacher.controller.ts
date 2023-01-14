import TeacherService from '../services/teacher.service'

class TeacherController {
  async signUp(req, res) {
    try {
      let userData: unknown = null
      userData = await TeacherService.signUp(req.body.params) // for prod
      // userData = await TeacherService.signUp(req.query); // for postman

      // temp don`t remove!!!
      // await sendConfirmationEmail({
      //   email: userData.data.email,
      //   hash: userData.data._id
      // })
      res.json(userData)
    } catch (e: any) {
      console.error(e)
      res.status(e.status).json(e)
    }
  }

  async getUserById(req, res) {
    try {
      const userData = await TeacherService.getUserById(req.params.id)
      res.json(userData)
    } catch (e: any) {
      console.error(e)
      res.status(e.status).json(e)
    }
  }

  async getUserPrivateData(req, res) {
    try {
      const userData = await TeacherService.getUserPrivateData(req.params.id)
      res.json(userData)
    } catch (e: any) {
      console.error(e)
      res.status(e.status).json(e)
    }
  }

  async updateUserPrivateData(req, res) {
    try {
      const userData = await TeacherService.updateUserPrivateData(req.body.params)
      res.json(userData)
    } catch (e: any) {
      console.error(e)
      res.status(e.status).json(e)
    }
  }

  async updateUserAuthData(req, res) {
    try {
      const userData = await TeacherService.updateUserAuthData(req.body.params)
      res.json(userData)
    } catch (e: any) {
      console.error(e)
      res.status(e.status).json(e)
    }
  }
}

export default new TeacherController()
