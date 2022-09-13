const service = require('../services/userService')

class AuthController {
  async registration(req, res, next) {
      try {
          // const { name, surname, login, email, password, userType } = req.body.params;
          // const userData = await service.registration({ name, surname, email, password, userType, login });
          
          // res.json({
          //     ...userData
          // });
          // res.json({ ...req.body.params });
          res.json({ ...req.body });
      } catch(e) {
          next(e)
      }
  }

}

module.exports = new AuthController()

