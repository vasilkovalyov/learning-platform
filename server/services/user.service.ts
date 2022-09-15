import UserModel from "../models/user.model"
import { signUpStudentValidation, signInValidation } from "../validation/auth.validation"

class AuthService {
    async signUpStudent(params) {
        const { error } = signUpStudentValidation(params)
        if (!error) return error.details[0].message;

        const { login, email, password, confirm_password, role } = params
        const userExist = await UserModel.findOne({ email: email });

        if (userExist) return `User with email - ${email} alreary exist`;

        const userModel = new UserModel({
            login,
            email,
            password,
            confirm_password,
            role
        });

        const savedUser = await userModel.save();
        return {
            status: 200,
            message: `Succsess user`,
            data: savedUser
        }
    }

    async signIn(params) {
        const { error } = signInValidation(params)
        if (error) return error.details[0].message;

        const { email, password } = params
        const user = await UserModel.findOne({ email: email });

        if (!user) return {
            status: 201,
            message: `User with email - ${email} no exist`,
            data: null
        };
        if (password !== user.password) return {
            status: 201,
            message: 'Wrong password',
            data: null
        }

        return {
            data: user,
            status: 200,
            message: `Succsess user ${user.login}`,
        }
    }
}

export default new AuthService()
