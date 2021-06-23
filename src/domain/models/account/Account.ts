import {Authority} from '../auth/Authority'

export default class Account {
    id: string
    email: string
    password: string // hashed
    secret: string
    createdAt: Date
    authority: Authority

    constructor(id: string, email: string, password: string, secret: string,
                createdAt: Date, authority: Authority) {
        this.id = id
        this.email = email
        this.password = password
        this.createdAt = createdAt
        this.secret = secret
        this.authority = authority
    }
}
