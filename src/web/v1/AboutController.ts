import {FastifyInstance} from 'fastify'
import AuthenticationService from '../../domain/services/AuthenticationService'
import AccountVM from './vms/AccountVM'
import AccountService from '../../domain/services/AccountService'
import multer from 'fastify-multer'
import FavoriteService from 'src/domain/services/FavoriteService'
import Favorite from 'src/domain/models/favorite/Favorite'
import AboutService from 'src/domain/services/AboutService'
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


export default class AboutController {

    private aboutService: AboutService

    private router: FastifyInstance

    constructor(router: FastifyInstance, aboutService: AboutService) {
        this.router = router

        this.aboutService = aboutService

        router.get('/api/v1/about',
            this.getVersion.bind(this))
    }

    async getVersion(req, res): Promise<String> {
        return await this.aboutService.getVersion()
    }

}
