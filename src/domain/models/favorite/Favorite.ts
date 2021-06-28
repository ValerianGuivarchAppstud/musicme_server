import {Authority} from '../auth/Authority'
import Song from './Song'

export default class Favorite {
    id: string
    createdAt: Date
    song: Song

    constructor(id: string, createdAt: Date, song: Song) {
        this.id = id
        this.createdAt = createdAt
        this.song = song
    }
}
