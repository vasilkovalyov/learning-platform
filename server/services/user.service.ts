import { IUser, IUserSignUp } from './../interfaces/user.interface';
import UserModel from "../models/user.model"
import { signUpStudentValidation, signInValidation } from "../validation/auth.validation"
import TokenService from '../services/token.service'
import ApiError from '../exeptions/api.exeptions';
import status from '../constants/status'

const bcrypt = require('bcryptjs');

interface IAuthUserResponse {
    status: number
    message: string
    data: Partial<IUser> | null
    token?: string
}

class AuthService {
    async signUpStudent(params: IUserSignUp): Promise<IAuthUserResponse> {
        const { error } = signUpStudentValidation(params)
        if (error) throw ApiError.BadRequest(error.details[0].message);

        const { login, email, confirm_password, role } = params
        const userExist = await UserModel.findOne({ email: email });

        const hashedPassword = await bcrypt.hash(confirm_password, bcrypt.genSaltSync(10));
        if (userExist) throw ApiError.BadRequest(`User with email - ${email} alreary exist!`);

        const userModel = new UserModel({
            login,
            email,
            password: hashedPassword,
            role
        });

        const savedUser = await userModel.save();

        return {
            status: status.SUCCESS,
            message: `Success user signup`,
            data: savedUser
        }
    }

    async signIn(params: Pick<IUser, 'email' | 'password'>): Promise<IAuthUserResponse> {
        const { error } = signInValidation(params)
        if (error) throw ApiError.BadRequest(error.details[0].message);

        const { email, password } = params
        const user = await UserModel.findOne({ email: email });
        if (!user) throw ApiError.BadRequest(`User with email - ${email} not exist!`);

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) throw ApiError.BadRequest(`Wrong password!`);
        
        const token = await TokenService.generateTokens({ _id: user._id.valueOf(), role: user.role })

        return {
            data: {
                _id: user._id.valueOf(),
                login: user.login,
                email: user.email,
                role: user.role,
            },
            status: status.SUCCESS,
            message: `Succsess user signin ${user.login}`,
            token: token.accessToken,
        }
    }
}

export default new AuthService()
