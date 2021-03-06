import HttpGateway from './web/HttpGateway'
import * as dotenv from 'dotenv'
import CloudinaryImageProvider from './data/cloudinary/CloudinaryImageProvider'
import MongoGateway from './data/mongo/MongoGateway'
import {IModule} from './domain/helpers/module/IModule'
import AccountController from './web/v1/AccountController'
import AccountService from './domain/services/AccountService'
import AuthenticationController from './web/v1/AuthenticationController'
import {DBAccountProvider} from './data/mongo/account/DBAccountProvider'
import {DBProfileProvider} from './data/mongo/profile/DBProfileProvider'
import AuthenticationService from './domain/services/AuthenticationService'
import EmailAuthProvider from './data/auth/EmailAuthProvider'
import JwtTokenProvider from './data/auth/JwtTokenProvider'
import { DBFavoriteProvider } from './data/mongo/favorite/DBFavoriteProvider'
import FavoriteService from './domain/services/FavoriteService'
import FavoriteController from './web/v1/FavoriteController'
import AboutController from './web/v1/AboutController'
import AboutService from './domain/services/AboutService'


export default async function dependencies(): Promise<IModule[]> {

    /**
     * MODULES
     */
    await dotenv.config()
    const http = new HttpGateway()
    const database = new MongoGateway()

    /**
     * PROVIDERS
     */
    const tokenProvider = new JwtTokenProvider()
    const cloudinaryImageProvider = new CloudinaryImageProvider()

    const accountProvider = new DBAccountProvider()
    const profileProvider = new DBProfileProvider()
    const favoriteProvider = new DBFavoriteProvider()

    const emailAuthProvider = new EmailAuthProvider(accountProvider)


    /**
     * SERVICES
     */
     const aboutService = new AboutService()
     const accountService = new AccountService(accountProvider, profileProvider, cloudinaryImageProvider)
     const authService = new AuthenticationService(accountProvider, [emailAuthProvider], tokenProvider, profileProvider)
    const favoriteService = new FavoriteService(accountProvider, profileProvider, favoriteProvider)

    /**
     * CONTROLLERS
     */
     new AboutController(http.router, aboutService)
     new AccountController(http.router, authService, accountService)
     new AuthenticationController(http.router,authService, accountService)
    new FavoriteController(http.router,authService, accountService, favoriteService)
    return [http, database]

}
