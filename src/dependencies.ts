import HttpGateway from './web/HttpGateway'
import * as dotenv from 'dotenv'
import CloudinaryImageProvider from './data/cloudinary/CloudinaryImageProvider'
import MongoGateway from './data/mongo/MongoGateway'
import {IModule} from './domain/helpers/module/IModule'
import AccountController from './web/v1/AccountController'
import AccountService from './domain/services/AccountService'
import AuthenticationController from './web/v1/AuthenticationController'
import {DBAccountProvider} from './data/mongo/account/DBAccountProvider'
import {ProfileProvider} from './data/mongo/profile/ProfileProvider'
import AuthenticationService from './domain/services/AuthenticationService'
import EmailAuthProvider from './data/auth/EmailAuthProvider'
import JwtTokenProvider from './data/auth/JwtTokenProvider'


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
    const profileProvider = new ProfileProvider()

    const emailAuthProvider = new EmailAuthProvider(accountProvider)


    /**
     * SERVICES
     */
    const accountService = new AccountService(accountProvider, profileProvider, cloudinaryImageProvider)
    const authService = new AuthenticationService(accountProvider, [emailAuthProvider], tokenProvider, profileProvider)

    /**
     * CONTROLLERS
     */
    new AccountController(http.router, authService, accountService)
    new AuthenticationController(http.router,authService, accountService)
    return [http, database]

}
