const jwt = require('jsonwebtoken');
import { RoleType } from '../../types/common';

class TokenService {
    async generateTokens(payload: { _id: string, role: RoleType }) {
        const accessToken = await jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: "1d" });
        const refreshToken = await jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "1d" });

        return {
          accessToken: accessToken,
          refreshToken: refreshToken
        }
    }

    async validateAccessToken(accessToken) {
      try {
          const userData = await jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
          return userData
      } catch(e) {
          return null
      }
  }

}

export default new TokenService()
