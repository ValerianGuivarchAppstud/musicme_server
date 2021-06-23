import ProviderErrors from '../../errors/ProviderErrors'
import Profile from '../../../domain/models/account/Profile'
import {DBProfile, DBProfileModel} from './ProfileSchema'
import IProfileProvider from '../../../domain/providers/account/IProfileProvider'

export class ProfileProvider implements IProfileProvider {

    private static toProfile(doc: DBProfile): Profile {
        return new Profile(doc.id, doc.accountId, doc.nickname, doc.pictureUrl)
    }

    private static fromProfile(profile: Profile): object {
        return {id: profile.id,
            accountId: profile.accountId,
            nickname: profile.nickname,
            pictureUrl: profile.pictureUrl}
    }

    async findById(id: string): Promise<Profile> {
        const profile = await DBProfileModel.findById(id).exec()
        if (!profile) {
            throw ProviderErrors.AccountNotFound
        }
        return ProfileProvider.toProfile(profile)
    }

    async findByAccountId(accountId: string): Promise<Profile> {
        const profile = await DBProfileModel.findOne({accountId: accountId}).exec()
        if (!profile) {
            throw ProviderErrors.AccountNotFound
        }
        return ProfileProvider.toProfile(profile)
    }

    async create(profile: Profile): Promise<Profile> {
        return ProfileProvider.toProfile(
            await DBProfileModel.create(ProfileProvider.fromProfile(profile) as DBProfile))
    }

    async update(profile: Profile): Promise<Profile> {
        return ProfileProvider.toProfile(
            await DBProfileModel.findByIdAndUpdate(profile.id, ProfileProvider.fromProfile(profile), {new: true}))
    }

    async findAll(): Promise<Profile[]> {
        return (await DBProfileModel.find({})).map( doc => ProfileProvider.fromProfile(doc) as DBProfile)
    }



}
