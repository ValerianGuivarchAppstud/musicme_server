import {FastifyInstance} from 'fastify'
import JWTToken from '../../domain/models/auth/JWTToken'
import AuthenticationService from '../../domain/services/AuthenticationService'
import AccountVM from './vms/AccountVM'
import AccountService from '../../domain/services/AccountService'

export default class AuthenticationController {

    private service: AuthenticationService

    private accountService: AccountService

    private router: FastifyInstance

    constructor(router: FastifyInstance, service: AuthenticationService, accountService: AccountService) {
        this.router = router

        this.service = service
        this.accountService = accountService

        router.post('/api/v1/auth/email/register',
            this.registerByEmail.bind(this))

        router.post('/api/v1/auth/email/login',
            this.loginByEmail.bind(this))

        router.post('/api/v1/auth/refresh',
            this.refreshToken.bind(this))
    }

    async loginByEmail(req, res): Promise<JWTToken> {
        return this.service.loginByEmail(req.body.email, req.body.password)
    }

    async registerByEmail(req, res): Promise<AccountVM> {
        const account = await this.service.registerByEmail(req.body.email, req.body.password)
        const profile = await  this.accountService.findProfileByAccountId(account.id)
        return new AccountVM(profile, account)
    }

    async refreshToken(req, res): Promise<JWTToken> {
        return this.service.refreshToken(req.body.refreshToken)
    }
}
