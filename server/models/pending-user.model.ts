import mongoose from 'mongoose';

import { model as StudentModel } from '../users/models/student.model'
import { model as TeacherModel } from '../users/models/teacher.model'
import { model as CompnayModel } from '../users/models/company.model'

export const pendingModel = new mongoose.Schema(StudentModel).add(TeacherModel).add(CompnayModel);

export default mongoose.model('PendingUser', pendingModel)


