import TeacherService from '../services/teacher.service'

class TeacherController {
  async signUp(req, res) {
    try {
      let userData: unknown = null
      userData = await TeacherService.signUp(req.body.params || req.body) // for prod
      res.json(userData)
    } catch (e: any) {
      res.status(e.status).json(e)
    }
  }

  async getUserById(req, res) {
    try {
      const userData = await TeacherService.getUserById(req.params.id)
      res.json(userData)
    } catch (e: any) {
      res.status(e.status).json(e)
    }
  }

  async getUserPrivateData(req, res) {
    try {
      const userData = await TeacherService.getUserPrivateData(req.params.id)
      res.json(userData)
    } catch (e: any) {
      res.status(e.status).json(e)
    }
  }

  async updateUserPrivateData(req, res) {
    try {
      const userData = await TeacherService.updateUserPrivateData(req.body.params)
      res.json(userData)
    } catch (e: any) {
      res.status(e.status).json(e)
    }
  }

  async updateUserAuthData(req, res) {
    try {
      const userData = await TeacherService.updateUserAuthData(req.body.params)
      res.json(userData)
    } catch (e: any) {
      res.status(e.status).json(e)
    }
  }

  async removeUser(req, res) {
    try {
      await TeacherService.removeUser(req.query.id || req.body.id)
      res
        .json({
          message: 'Teacher has been removed success',
        })
        .status(200)
    } catch (e: any) {
      res.status(e.status).json(e)
    }
  }

  async updateUserAccount(req, res) {
    try {
      const userData = await TeacherService.updateUserAccount(req.body.params || req.body)
      res.json(userData)
    } catch (e: any) {
      console.error(e)
      res.status(e.status).json(e)
    }
  }
}

export default new TeacherController()
