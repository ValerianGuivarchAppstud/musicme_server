import * as mongoose from 'mongoose'
import { DBContact } from '../contact/ContactSchema'
import { DBFavorite } from '../favorite/FavoriteSchema'
import { DBRinging } from '../ringing/RingingSchema'


export interface DBProfile
    extends mongoose.Document {
    accountId: string,
    nickname: string,
    pictureUrl: string,
    favorites: Array<DBFavorite>,
    contacts: Array<DBContact>,
    ringings: Array<DBRinging>
}

export const ProfileSchema = new mongoose.Schema({
    email: { type: String },
    accountId: {type: String},
    nickname: {type: String},
    pictureUrl: {type: String},
    favorites: {type:  { type : Array , "default" : [] }},
    contacts: {type:  { type : Array , "default" : [] }},
    ringings: {type:  { type : Array , "default" : [] }}

}, { timestamps: true})


export const DBProfileModel = mongoose.model<DBProfile>('DBProfile', ProfileSchema)
