import status from '../constants/status'

class ApiError {
    status: number
    errors: string
    message: string

    constructor(status, message, errors) {
        this.status = status;
        this.errors = errors;
        this.message = message
    }
    
    static BadRequest(message, errors = []) {
        return new ApiError(status.BAD_REQUEST, message, errors)
    }

    static UnauthorizedError(message, errors = []) {
        return new ApiError(status.UNAUTHORIZED, message, errors)
    }

    static ForbiddenError(message, errors = []) {
        return new ApiError(status.FORBIDDEN, message, errors)
    }
}

export default ApiError
