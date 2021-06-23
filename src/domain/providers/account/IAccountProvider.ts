import Account from '../../models/account/Account'

export default interface IAccountProvider {
    registerByEmail(email: string, password: string): Promise<Account>

    findById(id: string): Promise<Account>

    findByEmail(email: string): Promise<Account>

    existsByEmail(email: string): Promise<boolean>

    update(account: Account): Promise<Account>

}
