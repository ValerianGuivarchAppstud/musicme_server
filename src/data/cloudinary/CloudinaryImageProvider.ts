import IImageProvider from '../../domain/providers/image/IImageProvider'
import {v2 as cloudinary} from 'cloudinary'
import ProviderErrors from '../errors/ProviderErrors'

export default class CloudinaryImageProvider implements IImageProvider {

    constructor() {
        cloudinary.config({
            cloud_name : process.env.CDN_CLOUD_NAME,
            api_key: process.env.CDN_API_KEY,
            api_secret: process.env.CDN_API_SECRET
        })
    }

    uploadPicture(content: Buffer): Promise<string> {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    folder: 'profile_pictures',
                    eager : [{ width : 400, height : 400, crop : 'thumb', gravity : 'face'}]
        }, (error, result) => {
                    if (error) {
                        throw ProviderErrors.UploadFailed
                    } else {
                        resolve(result.url)
                    }
                }
            ).end(content)
        })
    }

}
