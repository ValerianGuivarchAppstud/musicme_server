
import {AuthType} from '../../domain/models/auth/AuthType'
import AuthRequest from '../../domain/models/auth/AuthRequest'
import ProviderErrors from '../errors/ProviderErrors'
import IAccountProvider from '../../domain/providers/account/IAccountProvider'
import IAuthProvider from '../../domain/providers/auth/IAuthProvider'
import {compareSync} from 'bcrypt'
import IFavoriteProvider from 'src/domain/providers/favorite/IFavoriteProvider'
import Account from 'src/domain/models/account/Account'
import Favorite from 'src/domain/models/favorite/Favorite'
import Profile from 'src/domain/models/account/Profile'


export default class FavoriteProvider implements IFavoriteProvider {

    private favoriteProvider: IFavoriteProvider

    constructor( favoriteProvider: IFavoriteProvider) {
        this.favoriteProvider = favoriteProvider
    }

    getFavoriteList(profile: Profile): Promise<Favorite[]> {
        return this.favoriteProvider.getFavoriteList(profile)
    }

    saveFavoriteStatus(profile: Profile, favorite: Favorite, isFavorite: Boolean): Promise<void> {
        return this.favoriteProvider.saveFavoriteStatus(profile, favorite, isFavorite)
    }
}
