import ProviderErrors from '../../errors/ProviderErrors'
import IFavoriteProvider from 'src/domain/providers/favorite/IFavoriteProvider'
import Favorite from 'src/domain/models/favorite/Favorite'
import { DBFavorite, DBFavoriteModel } from './FavoriteSchema'
import Profile from 'src/domain/models/profile/Profile'
import Song from 'src/domain/models/favorite/Song'

export class DBFavoriteProvider implements IFavoriteProvider {

    static toFavorite(doc: DBFavorite): Favorite {
        return new Favorite(doc.id, doc.createdAt, new Song(doc.idSong, doc.title, doc.artworkUrl))
    }

    private static fromFavorite(favorite: Favorite): object {
        return {
            id: favorite.id,
            createdAt: favorite.createdAt,
            idSong: favorite.song.id,
            title: favorite.song.title,
            artworkUrl: favorite.song.artworkUrl
        }
    }
/*    this.items.forEach(item => {
        if (true) {
            forEachReturned = true;
            return;
        }
    });*/

    async getFavoriteList(profile: Profile): Promise<Favorite[]> {
        var favoriteList = new Array()
        for (let index = 0; index < profile.favorites.length; index++) {
            favoriteList.push(
                DBFavoriteProvider.toFavorite(await DBFavoriteModel.findOne({id: profile.favorites[index].id}).exec())
            )            
        }
        return favoriteList
    }

    async saveFavoriteStatus(profile: Profile, favorite: Favorite, isFavorite: Boolean): Promise<String> {
        if(isFavorite) {
            const fav = await DBFavoriteModel.find({ idSong : favorite.song.id }).exec()
            if (fav.length > 0) {
                throw ProviderErrors.FavoriteAlreadyCreated
            }

            let result = await DBFavoriteModel.create(DBFavoriteProvider.fromFavorite(
                new Favorite('', new Date(), favorite.song)
            ))
            return result.id
        } else {
            await DBFavoriteModel.deleteOne({ id: favorite.id }, function (err) {
                if (err){
                    throw ProviderErrors.FavoriteNotDeleted
                }
              })
            return ""
        }
    }
}
