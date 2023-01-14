import StudentService from '../services/student.service'

class StudentController {
  async signUp(req, res) {
    try {
      let userData: unknown = null
      userData = await StudentService.signUp(req.body.params) // for prod
      // userData = await StudentService.signUp(req.query); // for postman

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
      const userData = await StudentService.getUserById(req.params.id)
      res.json(userData)
    } catch (e: any) {
      console.error(e)
      res.status(e.status).json(e)
    }
  }
}

export default new StudentController()
