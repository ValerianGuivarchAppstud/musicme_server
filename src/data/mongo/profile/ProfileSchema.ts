import * as mongoose from 'mongoose'


export interface DBProfile
    extends mongoose.Document {
    id: string,
    accountId: string,
    nickname: string,
    pictureUrl: string
}

export const ProfileSchema = new mongoose.Schema({
    email: { type: String },
    accountId: {type: String},
    nickname: {type: String},
    pictureUrl: {type: String}

}, { timestamps: true})

export const DBProfileModel = mongoose.model<DBProfile>('DBProfile', ProfileSchema)
