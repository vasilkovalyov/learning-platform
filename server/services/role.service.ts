import RoleModel, { IUserRoleType } from '../models/role.model'

class RoleServices {
  async saveRole(id: string, email: string, role: IUserRoleType) {
    const roleModel = new RoleModel({ _id: id, email: email, role: role })
    await roleModel.save()
  }

  async removeRoleById(id: string) {
    await RoleModel.findOneAndDelete({ _id: id })
  }
}

export default new RoleServices()
