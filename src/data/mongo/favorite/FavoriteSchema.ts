import * as mongoose from 'mongoose'
import Song from 'src/domain/models/favorite/Song'
import {Authority} from '../../../domain/models/auth/Authority'

export interface DBFavorite
    extends mongoose.Document {
    id: string,
    createdAt: Date,
    idSong: string
    title: string
    artworkUrl: string
}

export const FavoriteSchema = new mongoose.Schema<DBFavorite>({
    idSong: { type: String },
    title: { type: String },
    artworkUrl: { type: String },
}, { timestamps: true})

export const DBFavoriteModel = mongoose.model<DBFavorite>('DBFavorite',FavoriteSchema)
