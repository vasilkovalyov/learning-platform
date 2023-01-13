import status from '../constants/status'

class ApiError {
  status: number
  errors: string
  message: string
  data?: any

  constructor(status, message, errors, data) {
    this.status = status
    this.errors = errors
    this.message = message
    this.data = data
  }

  static BadRequest(message: string, errors = []) {
    return new ApiError(status.BAD_REQUEST, message, errors, null)
  }

  static UnauthorizedError(message: string, errors = []) {
    return new ApiError(status.UNAUTHORIZED, message, errors, null)
  }

  static ForbiddenError(message: string, errors = []) {
    return new ApiError(status.FORBIDDEN, message, errors, null)
  }
}

export default ApiError
