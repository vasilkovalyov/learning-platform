export const PUBLIC_REQUESTS = {
  SIGN_IN: 'auth/signin',
  SIGN_UP_TEACHER: 'auth/teacher/signup',
  SIGN_UP_STUDENT: 'auth/student/signup',
  GET_TEACHERS: 'teachers',
  GET_TEACHER_PROFILE_DATA: 'teacher-profile-data',
}

export const PRIVATE_REQUESTS = {
  BASE: '',
  STUDENT: {
    ACCOUNT_UPDATE: 'student/account/update',
    PRIVATE_DATA_UPDATE: 'student/private-data/update',
    PRIVATE_DATA: 'student/private-data',
    ADD_TO_GROUP_LESSON: 'student/group-lesson/add',
  },
  TEACHER: {
    ACCOUNT_UPDATE: 'teacher/account/update',
    PRIVATE_DATA_UPDATE: 'teacher/private-data/update',
    PRIVATE_DATA: 'teacher/private-data',
    CREATE_GROUP_LESSON: 'teacher/group-lesson/create',
    DELETE_GROUP_LESSON: 'teacher/group-lesson/delete',
    UPDATE_GROUP_LESSON: 'teacher/group-lesson/update',
    GET_TEACHER_GROUP_LESSONS: 'teacher/group-lessons/me',
    GET_TEACHER_GROUP_LESSON_BY_ID: 'teacher/group-lesson',
    GET_GROUP_LESSONS: 'teacher/group-lessons',
  },
}
