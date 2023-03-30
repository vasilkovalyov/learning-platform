import mongoose from 'mongoose'
const Schema = mongoose.Schema

export interface ITeacherPrivateDataModel {
  _id: string
  country: string
  state: string
  city: string
  address: string
  about_info: string
  user: string
  work_experience: IWorkExperienceProps
  education: IEducationProps
}

export interface ITeacherExperienceDate {
  dateStart: {
    month: string
    year: number
  }
  dateEnd: {
    month: string
    year: number
  }
}

export interface IWorkExperienceProps extends ITeacherExperienceDate {
  company_name: string
  position?: string
  place_destination?: string
}

export interface IEducationProps extends ITeacherExperienceDate {
  university_name: string
  faculty?: string
  specialization?: string
}

const model = new Schema({
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  address: {
    type: String,
  },
  about_info: {
    type: String,
  },
  user: {
    type: String,
    required: true,
    ref: 'Teacher',
  },
  work_experience: [
    {
      company_name: { type: String },
      position: { required: false, type: String },
      place_destination: { required: false, type: String },
      dateStart: {
        required: false,
        month: {
          type: String,
        },
        year: {
          type: String,
        },
      },
      dateEnd: {
        required: false,
        month: {
          type: String,
        },
        year: {
          type: String,
        },
      },
    },
  ],
  education: [
    {
      university_name: { type: String },
      faculty: { required: false, type: String },
      specialization: { required: false, type: String },
      dateStart: {
        required: false,
        month: {
          type: String,
        },
        year: {
          type: String,
        },
      },
      dateEnd: {
        required: false,
        month: {
          type: String,
        },
        year: {
          type: String,
        },
      },
    },
  ],
})

export default mongoose.model('TeacherPrivateData', model)
