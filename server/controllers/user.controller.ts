import UserService from "../services/auth.service"
import UserFabric from "../utilities/user-fabric-utilities";

class UserController {

  async getUserById(req, res) {
    try {
      const userData = await UserService.getUserById(req.params.id)
      // res.json(new UserFabric(req.params.type).create(userData))
      res.json(userData);
    } catch(e) {
      console.error(e)
      res.status(e.status).json(e)
    }
  }

}

export default new UserController()