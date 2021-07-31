import Account from '../../../domain/models/account/Account'
import Profile from '../../../domain/models/profile/Profile'

export default class AccountVM {
    id: string // profileId
    email: string
    nickname: string
    pictureUrl: string // from CDN
    createdAt: Date

    constructor(profile: Profile, account: Account) {
        this.email = account.email
        this.id = profile.id
        this.nickname = profile.nickname
        this.pictureUrl = profile.pictureUrl
        this.createdAt = account.createdAt
    }

}
