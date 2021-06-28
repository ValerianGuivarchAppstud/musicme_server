import {Authority} from '../auth/Authority'

export default class Song {
    id: string
    title: string
    artworkUrl: string

    constructor(id: string, title: string, artworkUrl: string) {
        this.id = id
        this.title = title
        this.artworkUrl = artworkUrl
    }
}
