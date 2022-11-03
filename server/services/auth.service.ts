import { IUser, ITeacherUser, ICompanyUser } from '../interfaces/user.interface';
import { IFormUser, IFormTeacher, IFormCompany } from '../interfaces/auth.interface';
import StudentModel from "../models/student.model"
import TeacherModel from "../models/teacher.model"
import CompanyModel from "../models/company.model"
import RoleModel from "../models/role.model"
import PendingModel from "../models/pending-user.model"
import { signUpStudentValidation, signInValidation, signUpTeacherValidation, signUpCompanyValidation } from "../validation/auth.validation"
import TokenService from './token.service'
import ApiError from '../exeptions/api.exeptions';
import { UserAccountType } from '../types/common'

const bcrypt = require('bcryptjs');

type AuthTypeForm = Pick<IFormUser, 'email' | 'password'>

interface IAuthUserResponse<T> {
    message?: string
    data: Partial<T> | null
    token?: string
}

class AuthService {
    async activateUser(hash: string) {
        const user = await PendingModel.findOne({ _id: hash });
        if (!user) throw ApiError.BadRequest(`This activation link already enabled`);
        await this.saveRole(user._id, user.role, user.email)

        if (user.role as UserAccountType === 'student') {
            const newUser = new StudentModel({
                login: user.login,
                email: user.email,
                password: user.password,
                role: user.role
            });
            await newUser.save()
        }
        if (user.role as UserAccountType === 'teacher') {

        }
        if (user.role as UserAccountType === 'company') {

        }
        await user.remove();

        return {
            message: `User ${hash} has been activated`,
            data: null
        }
    }

    async signUpStudent(params: IFormUser): Promise<IAuthUserResponse<IFormUser>> {
        const { error } = signUpStudentValidation(params)
        if (error) throw ApiError.BadRequest(error.details[0].message);

        const { login, email, confirm_password, role } = params
        const userRoleExist = await RoleModel.findOne({ email: email });
        // const userPendingExist = await PendingModel.findOne({ email: email }); // temp. don`t remove!!!!

        const hashedPassword = await bcrypt.hash(confirm_password, bcrypt.genSaltSync(10));
        if (userRoleExist) throw ApiError.BadRequest(`User with email - ${email} alreary exist!`); // temp. should remove later!!!
        // if (userRoleExist && userPendingExist) throw ApiError.BadRequest(`User with email - ${email} alreary exist!`); // temp. don`t remove!!!!


        const studentModel = new StudentModel({
            login,
            email,
            password: hashedPassword,
            role,
        } as IFormUser);

        // temp. don`t remove!!!!
        // const StudentModel = new PendingModel({
        //     login,
        //     email,
        //     password: hashedPassword,
        //     role,
        // } as IUser);

        const savedUser = await studentModel.save();
        this.saveRole(savedUser._id, role, email)

        return {
            message: `You have been registered`,
            data: {
                _id: savedUser._id,
                email: savedUser.email
            }
        }
    }

    async signUpTeacher(params: IFormTeacher): Promise<IAuthUserResponse<IFormTeacher>> {
        const { error } = signUpTeacherValidation(params)
        if (error) throw ApiError.BadRequest(error.details[0].message);

        const { login, email, confirm_password, role, address, city, state, country, education, phone, work_experience } = params
        const userExist = await RoleModel.findOne({ email: email });

        const hashedPassword = await bcrypt.hash(confirm_password, bcrypt.genSaltSync(10));
        if (userExist) throw ApiError.BadRequest(`User with email - ${email} alreary exist!`);

        const teacherModel = new TeacherModel({
            login,
            email,
            password: hashedPassword,
            role,
            address,
            city,
            state,
            country,
            education,
            phone,
            work_experience,
        });

        const savedUser = await teacherModel.save();
        this.saveRole(savedUser._id, role, email)

        return {
            message: `You have been registered`,
            data: null
        }
    }

    async signUpCompany(params: IFormCompany): Promise<IAuthUserResponse<IFormCompany>> {
        const { error } = signUpCompanyValidation(params)
        if (error) throw ApiError.BadRequest(error.details[0].message);

        const { login, email, confirm_password, role, city, state, country, phone, company_name, inn_code, mailing_address, legal_address } = params
        const userExist = await RoleModel.findOne({ email: email });

        const hashedPassword = await bcrypt.hash(confirm_password, bcrypt.genSaltSync(10));
        if (userExist) throw ApiError.BadRequest(`User with email - ${email} alreary exist!`);

        const companyModel = new CompanyModel({
            login,
            email,
            password: hashedPassword,
            role,
            city,
            state,
            country,
            phone,
            company_name,
            inn_code,
            mailing_address,
            legal_address,
        });

        const savedUser = await companyModel.save();
        this.saveRole(savedUser._id, role, email)

        return {
            message: `You have been registered`,
            data: null
        }
    }

    async saveRole(_id: string, role: UserAccountType, email: string) {
        const roleModel = new RoleModel({ _id, role, email })
        await roleModel.save();
    }

    async signIn(params: AuthTypeForm): Promise<IAuthUserResponse<IFormUser | IFormTeacher | IFormCompany>> {
        const { error } = signInValidation(params)
        if (error) throw ApiError.BadRequest(error.details[0].message);

        const { email, password } = params
        const findedRole = await RoleModel.findOne({ email: email });
        const pendingRole = await PendingModel.findOne({ email: email });
        if (pendingRole === null && findedRole === null) throw ApiError.BadRequest(`User with email - ${email} not exist!`);
        let user: IUser | any

        if (findedRole.role as UserAccountType === "student") {
            user = await StudentModel.findOne({ email: email });
        }
        if (findedRole.role as UserAccountType === "teacher") {
            user = await TeacherModel.findOne({ email: email });
        }
        if (findedRole.role as UserAccountType === "company") {
            user = await CompanyModel.findOne({ email: email });
        }

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
            message: `Succsess user signin ${user.login}`,
            token: token.accessToken,
        }
    }

    async getUserById(id: string): Promise<IUser | ITeacherUser | ICompanyUser> {
        let user: Partial<IUser> = {}
        const responseRole = await RoleModel.findOne({ _id: id });
        if (responseRole.role === 'student') {
            user = await StudentModel.findOne({ _id: id })
            return user as IUser
        }
        if (responseRole.role === 'teacher') {
            user = await TeacherModel.findOne({ _id: id })
            return user as ITeacherUser
        }
        if (responseRole.role === 'company') {
            user = await CompanyModel.findOne({ _id: id })
            return user as ICompanyUser
        }
        if (!user) {
            return null
        }
    }
}

export default new AuthService()
