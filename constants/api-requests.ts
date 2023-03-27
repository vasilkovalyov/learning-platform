export const PUBLIC_REQUESTS = {
  SIGN_IN: 'auth/signin',
  SIGN_UP_TEACHER: 'auth/teacher/signup',
  SIGN_UP_STUDENT: 'auth/student/signup',
}

export const PRIVATE_REQUESTS = {
  BASE: '',
  TEACHER_SAVE_PRIVATE_DATA: 'teacher/private-data',
  TEACHER_SAVE_AUTH_DATA: 'teacher/auth-data',
  STUDENT_ACCOUNT_UPDATE: 'student/account/update',
  STUDENT_PRIVATE_DATA_UPDATE: 'student/private-data/update',
  STUDENT_PRIVATE_DATA: 'student/private-data',
  TEACHER_ACCOUNT_UPDATE: 'teacher/account/update',
  TEACHER_PRIVATE_DATA_UPDATE: 'teacher/private-data/update',
}
