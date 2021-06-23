import * as mongoose from 'mongoose'
import {Authority} from '../../../domain/models/auth/Authority'

export interface DBAccount
    extends mongoose.Document {
    createdAt: Date,
    id: string,
    email: string,
    password: string,
    authority: Authority,
    secret: string,
}

export const AccountSchema = new mongoose.Schema<DBAccount>({
    email: { type: String },
    password: { type: String },
    authority: { type: String},
    secret: { type: String }
}, { timestamps: true})

export const DBAccountModel = mongoose.model<DBAccount>('DBAccount',AccountSchema)
