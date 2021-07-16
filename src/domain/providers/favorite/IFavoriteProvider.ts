import Profile from 'src/domain/models/account/Profile';
import Favorite from 'src/domain/models/favorite/Favorite';
import Account from '../../models/account/Account'

export default interface IFavoriteProvider {
    
    getFavoriteList(profile: Profile): Promise<Array<Favorite>>

    saveFavoriteStatus(profile: Profile, favorite: Favorite, isFavorite: Boolean): Promise<boolean>

}
