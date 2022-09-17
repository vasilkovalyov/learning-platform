const jwt = require('jsonwebtoken');
import { RoleType } from '../../types/common';

class TokenService {
    async generateTokens(payload: { _id: string, role: RoleType }) {
        const accessToken = await jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: "30s" });
        const refreshToken = await jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "30d" });

        return {
          accessToken: accessToken,
          refreshToken: refreshToken
        }
    }
}

export default new TokenService()
