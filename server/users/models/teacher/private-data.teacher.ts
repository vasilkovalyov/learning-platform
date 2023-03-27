import mongoose from 'mongoose'
const Schema = mongoose.Schema

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
  work_experience: {
    type: [
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
  },
  education: {
    type: [
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
  },
  teacher: {
    type: String,
    required: true,
    ref: 'Teacher',
  },
})

export const TeacherPrivateDataModel = mongoose.model('TeacherPrivateData', model)
