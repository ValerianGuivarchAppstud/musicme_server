import {FastifyInstance} from 'fastify'
import AuthenticationService from '../../domain/services/AuthenticationService'
import AccountVM from './vms/AccountVM'
import AccountService from '../../domain/services/AccountService'
import multer from 'fastify-multer'
import FavoriteService from 'src/domain/services/FavoriteService'
import Favorite from 'src/domain/models/favorite/Favorite'
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


export default class FavoriteController {

    private authService: AuthenticationService

    private favoriteService: FavoriteService

    private accountService: AccountService

    private router: FastifyInstance

    constructor(router: FastifyInstance, authService: AuthenticationService, accountService: AccountService, favoriteService: FavoriteService) {
        this.router = router

        this.authService = authService
        this.accountService = accountService
        this.favoriteService = favoriteService

        router.get('/api/v1/favorites',
            this.getFavoriteList.bind(this))
        router.post('/api/v1/favorite/status',
            this.saveFavoriteStatus.bind(this))
    }

    async getFavoriteList(req, res): Promise<Array<Favorite>> {
        const acc = await this.authService.getConnectedAccount(req.headers.authorization)
        const profile = await this.accountService.findProfileByAccountId(acc.id)
        return await this.favoriteService.getFavorites(profile)
    }

    async saveFavoriteStatus(req, res): Promise<void> {
        console.log("a")
        console.log(req.headers.authorization.toString())
        console.log("b")
        const acc = await this.authService.getConnectedAccount(req.headers.authorization)
        console.log(acc.id)
        console.log("c")

        const profile = await this.accountService.findProfileByAccountId(acc.id)
        return await this.favoriteService.saveFavoriteStatus(profile, req.body.favorite, req.body.status)
    }

}
