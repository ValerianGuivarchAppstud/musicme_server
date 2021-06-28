import * as mongoose from 'mongoose'
import Favorite from 'src/domain/models/favorite/Favorite'


export interface DBProfile
    extends mongoose.Document {
    id: string,
    accountId: string,
    nickname: string,
    pictureUrl: string,
    favorites: Array<Favorite>
}

export const ProfileSchema = new mongoose.Schema({
    email: { type: String },
    accountId: {type: String},
    nickname: {type: String},
    pictureUrl: {type: String},
    favorites: {type:  { type : Array , "default" : [] }}

}, { timestamps: true})


export const DBProfileModel = mongoose.model<DBProfile>('DBProfile', ProfileSchema)
