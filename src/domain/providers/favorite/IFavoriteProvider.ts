import Profile from 'src/domain/models/profile/Profile';
import Favorite from 'src/domain/models/favorite/Favorite';

export default interface IFavoriteProvider {
    
    getFavoriteList(profile: Profile): Promise<Array<Favorite>>

    saveFavoriteStatus(profile: Profile, favorite: Favorite, isFavorite: Boolean): Promise<String>

}
