import {Authority} from '../../models/auth/Authority'
import JWTToken from '../../models/auth/JWTToken'
import Authentication from '../../models/auth/Authentication'

export default interface ITokenProvider {

  generateTokens(accountId: string, secret: string, authority: Authority): Promise<JWTToken>

  unpackToken(accessToken: string): Promise<Authentication>

  verifyToken(accessToken: string, secret: string): Promise<void>

}
