import Favorite from "../favorite/Favorite"

export default class Profile {
    id: string
    accountId: string
    nickname: string // displayed name
    pictureUrl: string // from CDN
    favorites: Favorite[]

    constructor(id: string, accountId: string, nickname: string, pictureUrl: string, favorites: Array<Favorite>) {
        this.id = id
        this.accountId = accountId
        this.nickname = nickname
        this.pictureUrl = pictureUrl,
        this.favorites = favorites
    }
}
