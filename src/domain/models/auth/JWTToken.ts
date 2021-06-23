import {Authority} from './Authority'

export default class JWTToken {

  accessToken: string
  accessTokenExpiration: number
  refreshToken: string
  refreshTokenExpiration: number
  authority: Authority

  constructor(accessToken: string, accessTokenExpirationDate: Date, refreshToken: string,
              refreshTokenExpirationDate: Date, authority: Authority) {
    this.accessToken = accessToken
    this.accessTokenExpiration = Math.round(accessTokenExpirationDate.getTime() / 1000)

    this.refreshToken = refreshToken
    this.refreshTokenExpiration = Math.round(refreshTokenExpirationDate.getTime() / 1000)

    this.authority = authority
  }
}
