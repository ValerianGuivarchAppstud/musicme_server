import IAccountProvider from '../providers/account/IAccountProvider'
import JWTToken from '../models/auth/JWTToken'
import Account from '../models/account/Account'
import AuthRequest from '../models/auth/AuthRequest'
import {AuthType} from '../models/auth/AuthType'
import IAuthProvider from '../providers/auth/IAuthProvider'
import ITokenProvider from '../providers/auth/ITokenProvider'
import ProviderErrors from '../../data/errors/ProviderErrors'
import IProfileProvider from '../providers/account/IProfileProvider'
import DomainErrors from '../models/errors/DomainErrors'
import Profile from '../models/profile/Profile'
import Favorite from '../models/favorite/Favorite'

export default class AuthenticationService {

    private accountProvider: IAccountProvider

    private profileProvider: IProfileProvider

    private authProviders: IAuthProvider[]

    private tokenProvider: ITokenProvider

    constructor(accountProvider: IAccountProvider, authProviders: IAuthProvider[], tokenProvider: ITokenProvider,
                profileProvider: IProfileProvider) {
        this.accountProvider = accountProvider
        this.authProviders = authProviders
        this.tokenProvider = tokenProvider
        this.profileProvider = profileProvider
    }

    /**
     * EMAIL
     */

    async loginByEmail(email: string, password: string): Promise<JWTToken> {
        const request = new AuthRequest(AuthType.EMAIL, email, password)
        if (! await this.authProviders.find((elt) => elt.supports(request.type)).verifyLogin(request)) {
            throw DomainErrors.AuthFailed
        }
        // Find or create account
        const account = await this.accountProvider.findByEmail(email)
        return this.tokenProvider.generateTokens(account.id, account.secret, account.authority)
    }

    async registerByEmail(email: string, password: string): Promise<Account> {
        const account = await this.accountProvider.registerByEmail(email, password)
        await this.profileProvider.create(new Profile(undefined, account.id, undefined, undefined, [], [], []))
        return account
    }

    /**
     * GLOBAL
     */

    async refreshToken(refreshToken: string): Promise<JWTToken> {
        const auth = await this.tokenProvider.unpackToken(refreshToken)
        if (!auth.isRefreshToken) {
            throw ProviderErrors.WrongToken
        }
        const account = await this.accountProvider.findById(auth.subject)
        await this.tokenProvider.verifyToken(refreshToken, account.secret)
        return this.tokenProvider.generateTokens(account.id, account.secret, account.authority)
    }

    async getConnectedAccount(authorization: string): Promise<Account> {
        const accessToken = authorization.replace('Bearer ', '')
        const auth = await this.tokenProvider.unpackToken(accessToken)
        if (auth.isRefreshToken) {
            throw ProviderErrors.WrongToken
        }
        const account = await this.accountProvider.findById(auth.subject)
        await this.tokenProvider.verifyToken(accessToken, account.secret)
        return account
    }

}
