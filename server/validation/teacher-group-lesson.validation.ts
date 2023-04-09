import Joi from 'joi'
import { ITeacherGroupLessonCreateProps, ITeacherGroupLessonEditProps } from '../models/teacher-group-lesson.model'

export const createTeacherGroupLessonValidation = (data: ITeacherGroupLessonCreateProps) => {
  const schema = Joi.object({
    teacher: Joi.string().required(),
    name: Joi.string().required(),
    dateLesson: Joi.date().required(),
    recruitment_period_date_start: Joi.date().required(),
    recruitment_period_date_end: Joi.date().required(),
    timeStart: Joi.string().required(),
    duration: Joi.number().required(),
    price: Joi.number().required(),
    students_level: Joi.string().required(),
    students_age: Joi.string().required(),
    description: Joi.string().required(),
    min_count_of_students: Joi.number().required(),
    max_count_of_students: Joi.number().required(),
  })

  return schema.validate(data)
}

export const editTeacherGroupLessonValidation = (data: ITeacherGroupLessonEditProps) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    dateLesson: Joi.date().required(),
    recruitment_period_date_start: Joi.date().required(),
    recruitment_period_date_end: Joi.date().required(),
    timeStart: Joi.string().required(),
    duration: Joi.number().required(),
    price: Joi.number().required(),
    students_level: Joi.string().required(),
    students_age: Joi.string().required(),
    description: Joi.string().required(),
    min_count_of_students: Joi.number().required(),
    max_count_of_students: Joi.number().required(),
    teacher: Joi.string().required(),
    students: Joi.array().items(Joi.string().required()).required(),
  })

  return schema.validate(data)
}
