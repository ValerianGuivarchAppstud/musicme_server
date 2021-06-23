export default class Profile {
    id: string
    accountId: string
    nickname: string // displayed name
    pictureUrl: string // from CDN

    constructor(id: string, accountId: string, nickname: string, pictureUrl: string) {
        this.id = id
        this.accountId = accountId
        this.nickname = nickname
        this.pictureUrl = pictureUrl
    }
}
