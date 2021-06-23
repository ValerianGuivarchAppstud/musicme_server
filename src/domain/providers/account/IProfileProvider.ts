import Profile from '../../models/account/Profile'

export default interface IProfileProvider {
    create(profile: Profile): Promise<Profile>

    update(profile: Profile): Promise<Profile>

    findAll(): Promise<Profile[]>

    findById(id: string): Promise<Profile>

    findByAccountId(accountId: string): Promise<Profile>
}
