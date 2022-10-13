import ApiError from '../exeptions/api.exeptions'
import tokenService from '../services/token.service'

module.exports = async function(req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader) return next(ApiError.UnauthorizedError('User is not authorized!'));
        const userData = await tokenService.validateAccessToken(authorizationHeader);
        console.log('userData', userData)

        if(!userData) return next(ApiError.UnauthorizedError('Token has been destroyed!'));
        req.user = userData;
        next();
    } catch(e) {
        return next(ApiError.UnauthorizedError('User is not authorized!'));
    }
}

