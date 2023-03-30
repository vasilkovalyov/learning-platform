export const PUBLIC_REQUESTS = {
  SIGN_IN: 'auth/signin',
  SIGN_UP_TEACHER: 'auth/teacher/signup',
  SIGN_UP_STUDENT: 'auth/student/signup',
}

export const PRIVATE_REQUESTS = {
  BASE: '',
  STUDENT: {
    ACCOUNT_UPDATE: 'student/account/update',
    PRIVATE_DATA_UPDATE: 'student/private-data/update',
    PRIVATE_DATA: 'student/private-data',
  },
  TEACHER: {
    ACCOUNT_UPDATE: 'teacher/account/update',
    PRIVATE_DATA_UPDATE: 'teacher/private-data/update',
    PRIVATE_DATA: 'teacher/private-data',
  },
}
