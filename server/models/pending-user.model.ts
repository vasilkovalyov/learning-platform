const mongoose = require('mongoose');
const extendSchema = require('mongoose-extend-schema');

import { model as StudentModel } from './student.model'
import { model as TeacherModel } from './teacher.model'
import { model as CompnayModel } from './company.model'

export const pendingModel = mongoose.Schema(StudentModel).add(TeacherModel).add(CompnayModel);

export default mongoose.model('PendingUser', pendingModel)


