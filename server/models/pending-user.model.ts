import mongoose from 'mongoose'

import { model as StudentModel } from '../users/models/student.model'
import { model as TeacherModel } from '../users/models/teacher.model'

export const pendingModel = new mongoose.Schema(StudentModel).add(TeacherModel)

export default mongoose.model('PendingUser', pendingModel)
