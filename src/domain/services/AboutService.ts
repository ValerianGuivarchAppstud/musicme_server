import IAccountProvider from '../providers/account/IAccountProvider'
import Account from '../models/account/Account'
import IProfileProvider from '../providers/account/IProfileProvider'
import Profile from '../models/account/Profile'
import IImageProvider from '../providers/image/IImageProvider'
import IFavoriteProvider from '../providers/favorite/IFavoriteProvider'
import Favorite from '../models/favorite/Favorite'

export default class AboutService {

    constructor() {
    }    

    async getVersion(): Promise<String> {
        return "0.1"
    }

}
