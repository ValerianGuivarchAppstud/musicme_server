import {hashSync} from 'bcrypt'
import * as uuid from 'uuid'
import Account from '../../../domain/models/account/Account'
import {Authority} from '../../../domain/models/auth/Authority'
import ProviderErrors from '../../errors/ProviderErrors'
import IAccountProvider from '../../../domain/providers/account/IAccountProvider'
import IFavoriteProvider from 'src/domain/providers/favorite/IFavoriteProvider'
import Favorite from 'src/domain/models/favorite/Favorite'
import { DBFavorite, DBFavoriteModel } from './FavoriteSchema'
import Profile from 'src/domain/models/account/Profile'
import { DBAccount } from '../account/AccountSchema'
import Song from 'src/domain/models/favorite/Song'

export class DBFavoriteProvider implements IFavoriteProvider {

    private static toFavorite(doc: DBFavorite): Favorite {
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
        profile.favorites.forEach(async function(item, index, array) {
            console.log(item, index);
            favoriteList.push(
                DBFavoriteProvider.toFavorite(await DBFavoriteModel.findOne({id: item.id}).exec())
            )
        });
        return favoriteList
    }

    async saveFavoriteStatus(profile: Profile, favorite: Favorite, isFavorite: Boolean): Promise<void> {
        if(isFavorite) {
            const fav = await DBFavoriteModel.find({ id : favorite.id }).exec()
            if (fav.length > 0) {
                throw ProviderErrors.FavoriteAlreadyCreated
            }
            await DBFavoriteModel.create(DBFavoriteProvider.fromFavorite(
                new Favorite('', new Date(), favorite.song)
            ))
        } else {
            const fav = await DBFavoriteModel.find({ id : favorite.id }).exec()
            if (fav.length == 0) {
                throw ProviderErrors.FavoriteNotFound
            }
            await DBFavoriteModel.deleteOne({ id: favorite.id }, function (err) {
                if (err) throw ProviderErrors.FavoriteNotDeleted
              })
        }
        return 
    }
}
