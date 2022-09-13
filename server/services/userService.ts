const UserModel = require('../models/user');

class UserService {
    async registration(params) {
        const { name, surname, email, password, login, userType } = params
        const userExist = await UserModel.findOne({ email: email });

        if (userExist) throw `User with email - ${email} alreary exist`;

        const userModel = new UserModel({
            login,
            name,
            surname,
            email,
            password,
            userType
        });


        const savedUser = await userModel.save();
        return savedUser
    }
}

module.exports = new UserService()
