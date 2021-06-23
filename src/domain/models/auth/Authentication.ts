import {Authority} from './Authority'

export default class Authentication {

  authority: Authority
  issuedAt: Date
  expiresAt: Date
  subject: string
  isRefreshToken: boolean = false

  constructor(authority: Authority, issuedAt: Date, expiresAt: Date, subject: string, isRefreshToken: boolean) {
    this.authority = authority
    this.issuedAt = issuedAt
    this.expiresAt = expiresAt
    this.subject = subject
    this.isRefreshToken = isRefreshToken
  }

}
