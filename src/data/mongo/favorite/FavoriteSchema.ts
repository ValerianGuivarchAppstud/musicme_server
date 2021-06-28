import * as mongoose from 'mongoose'
import Song from 'src/domain/models/favorite/Song'
import {Authority} from '../../../domain/models/auth/Authority'

export interface DBFavorite
    extends mongoose.Document {
    id: string,
    createdAt: Date,
    song: Song,
}

export const FavoriteSchema = new mongoose.Schema<DBFavorite>({
    song: { type: Song },
}, { timestamps: true})

export const DBFavoriteModel = mongoose.model<DBFavorite>('DBFavorite',FavoriteSchema)
