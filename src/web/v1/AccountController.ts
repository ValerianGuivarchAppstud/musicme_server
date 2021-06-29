import {FastifyInstance} from 'fastify'
import AuthenticationService from '../../domain/services/AuthenticationService'
import AccountVM from './vms/AccountVM'
import AccountService from '../../domain/services/AccountService'
import multer from 'fastify-multer'
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


export default class AccountController {

    private authService: AuthenticationService

    private accountService: AccountService

    private router: FastifyInstance

    constructor(router: FastifyInstance, authService: AuthenticationService, accountService: AccountService) {
        this.router = router

        this.authService = authService
        this.accountService = accountService

        router.get('/api/v1/account/me',
            this.getAccount.bind(this))
        router.put('/api/v1/account/update',
            this.updateAccount.bind(this))
        router.post('/api/v1/account/me/profilePicture', {preHandler: upload.single('file')},
            this.uploadProfilePicture.bind(this))
    }

    async getAccount(req, res): Promise<AccountVM> {
        const acc = await this.authService.getConnectedAccount(req.headers.authorization)
        const profile = await this.accountService.findProfileByAccountId(acc.id)
        return new AccountVM(profile, acc)
    }

    async updateAccount(req, res): Promise<AccountVM> {
        // Checking on auth
        const accAuth = await this.authService.getConnectedAccount(req.headers.authorization)
        const profileAuth = await this.accountService.findProfileByAccountId(accAuth.id)
        const acc = await this.accountService.updateAccount({...accAuth,
            email: req.body.email || accAuth.email})
        const profile = await this.accountService.updateProfile({...profileAuth,
            nickname: req.body.nickname || profileAuth.nickname})
        return new AccountVM(profile, acc)
    }

    async uploadProfilePicture(req, res): Promise<AccountVM> {
        // Checking on auth
        const acc = await this.authService.getConnectedAccount(req.headers.authorization)
        const profile = await this.accountService.updateProfilePicture(
            await this.accountService.findProfileByAccountId(acc.id), req.file.buffer)
        return new AccountVM(profile, acc)
    }

}
