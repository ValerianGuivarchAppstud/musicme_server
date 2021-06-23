import {hashSync} from 'bcrypt'
import * as uuid from 'uuid'
import Account from '../../../domain/models/account/Account'
import {DBAccount, DBAccountModel} from './AccountSchema'
import {Authority} from '../../../domain/models/auth/Authority'
import ProviderErrors from '../../errors/ProviderErrors'
import IAccountProvider from '../../../domain/providers/account/IAccountProvider'

export class DBAccountProvider implements IAccountProvider {

    private static toAccount(doc: DBAccount): Account {
        return new Account(doc.id, doc.email, doc.password, doc.secret, doc.createdAt, doc.authority)
    }

    private static fromAccount(account: Account): object {
        return {
            id: account.id,
            email: account.email,
            password: account.password,
            secret: account.secret,
            authority : account.authority}
    }

    async findByEmail(email: string): Promise<Account> {
        const account =  await DBAccountModel.findOne({email: email}).exec()
        if (!account) {
            throw ProviderErrors.AccountNotFound
        }
        return DBAccountProvider.toAccount(account)
    }

    async existsByEmail(email: string): Promise<boolean> {
        return  DBAccountModel.exists({email: email})
    }

    async findById(id: string): Promise<Account> {
        const account = await DBAccountModel.findById(id).exec()
        if (!account) {
            throw ProviderErrors.AccountNotFound
        }
        return DBAccountProvider.toAccount(account)
    }

    async registerByEmail(email: string, password: string): Promise<Account> {
        // Check if account already exists
        const acc = await DBAccountModel.find({ email : email }).exec()
        if (acc.length > 0) {
            throw ProviderErrors.AccountAlreadyCreated
        }
        return DBAccountProvider.toAccount(await DBAccountModel.create(DBAccountProvider.fromAccount(
            new Account('', email, hashSync(password, 10), uuid.v1(), new Date(),
                Authority.USER)) as DBAccount))
    }

    async update(account: Account): Promise<Account> {
        if (account.email) {
            const accountEmail = await DBAccountModel.findOne({email: account.email}).exec()
            if (accountEmail && accountEmail.id !== account.id) {
                throw ProviderErrors.AccountAlreadyCreated
            }
        }
        return DBAccountProvider.toAccount(
            (await DBAccountModel.findByIdAndUpdate(account.id, DBAccountProvider.fromAccount(account),
                {new: true}).exec())
        )
    }

}
