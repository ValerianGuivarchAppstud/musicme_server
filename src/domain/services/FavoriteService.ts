import IAccountProvider from '../providers/account/IAccountProvider'
import Account from '../models/account/Account'
import IProfileProvider from '../providers/account/IProfileProvider'
import Profile from '../models/account/Profile'
import IImageProvider from '../providers/image/IImageProvider'
import IFavoriteProvider from '../providers/favorite/IFavoriteProvider'
import Favorite from '../models/favorite/Favorite'

export default class FavoriteService {

    private accountProvider: IAccountProvider

    private profileProvider: IProfileProvider

    private favoriteProvider: IFavoriteProvider

    constructor(accountProvider: IAccountProvider, profileProvider: IProfileProvider, favoriteProvider: IFavoriteProvider) {
        this.accountProvider = accountProvider
        this.profileProvider = profileProvider
        this.favoriteProvider = favoriteProvider
    }
    

    async saveFavoriteStatus(profile: Profile, favorite: Favorite, isFavorite: Boolean): Promise<boolean> {
        return this.favoriteProvider.saveFavoriteStatus(profile, favorite, isFavorite)
    }
    

    async getFavorites(profile: Profile): Promise<Array<Favorite>> {
        return this.favoriteProvider.getFavoriteList(profile)
    }

}
