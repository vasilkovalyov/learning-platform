import ApiError from '../exeptions/api.exeptions'

export default function(err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({
          status: err.status,
          message: err.message,
          errors: err.errors
        })
    }
    return res.status(500).json({
      message: err.message || 'Error from server'
    })
}
