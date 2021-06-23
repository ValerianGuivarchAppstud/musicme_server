
import {decode, sign, TokenExpiredError, verify} from 'jsonwebtoken'
import JWTToken from '../../domain/models/auth/JWTToken'
import Authentication from '../../domain/models/auth/Authentication'
import ProviderErrors from '../errors/ProviderErrors'
import {Authority} from '../../domain/models/auth/Authority'
import ITokenProvider from '../../domain/providers/auth/ITokenProvider'

export default class JwtTokenProvider implements ITokenProvider {

    async generateTokens(accountId: string, secret: string, authority: Authority): Promise<JWTToken> {
        const expirationAccess = 86400 // 1 day
        const expirationRefresh = 2592000 // 30 days
        const accessToken = sign({authority: authority},
            process.env.JWT_SECRET + secret,
            {subject: accountId.toString(),
                expiresIn: expirationAccess})
        const refreshToken =  sign({authority: authority, accessToken: accessToken},
            process.env.JWT_SECRET + secret,
            {subject: accountId.toString(),
                expiresIn: expirationRefresh}
        )
        const today = new Date()
        return new JWTToken(accessToken, new Date(today.getTime() + 1000 * expirationAccess
        ), refreshToken, new Date(today.getTime() + 1000 * expirationRefresh), authority)
    }

    async unpackToken(token: string): Promise<Authentication> {
        const token2 = decode(token)
        if (!token2) {
            throw ProviderErrors.WrongToken
        }
        if (typeof token2 === 'object') {
            return new Authentication(token2.authority, new Date(token2.iat), new Date(token2.exp),
                token2.sub, 'accessToken' in token2)
        }
        throw ProviderErrors.WrongToken
    }

    async verifyToken(accessToken: string, secret: string): Promise<void> {
        try {
            await verify(accessToken,
                process.env.JWT_SECRET + secret)
            return
        } catch (err) {
            if (err instanceof TokenExpiredError) {
                throw ProviderErrors.ExpiredToken
            }
        }
        throw ProviderErrors.WrongToken
    }

}
