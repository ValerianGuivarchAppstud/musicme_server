import IAccountProvider from '../providers/account/IAccountProvider'
import Account from '../models/account/Account'
import IProfileProvider from '../providers/account/IProfileProvider'
import Profile from '../models/account/Profile'
import IImageProvider from '../providers/image/IImageProvider'

export default class AccountService {

    private accountProvider: IAccountProvider

    private profileProvider: IProfileProvider

    private imageProvider: IImageProvider

    constructor(accountProvider: IAccountProvider, profileProvider: IProfileProvider, imageProvider: IImageProvider) {
        this.accountProvider = accountProvider
        this.profileProvider = profileProvider
        this.imageProvider = imageProvider
    }

    async updateAccount(account: Account): Promise<Account> {
        return this.accountProvider.update(account)
    }

    async updateProfile(profile: Profile): Promise<Profile> {
        return this.profileProvider.update(profile)
    }

    async updateProfilePicture(profile: Profile, content: Buffer): Promise<Profile> {
        const imageUrl = await this.imageProvider.uploadPicture(content)
        return this.profileProvider.update({...profile, pictureUrl : imageUrl})
    }

    async findProfileByAccountId(accountId: string): Promise<Profile> {
        return this.profileProvider.findByAccountId(accountId)
    }

    async findProfileById(id: string): Promise<Profile> {
        return this.profileProvider.findById(id)
    }
}
