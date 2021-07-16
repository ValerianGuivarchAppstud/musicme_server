import * as createHttpError from 'http-errors'

export default class ProviderErrors {

    static ExpiredToken: createHttpError.HttpError = createHttpError(createHttpError(401,
        'The token has expired. Please refresh token', {code: 'EXPIRED_TOKEN'}))

    static WrongToken: createHttpError.HttpError = createHttpError(createHttpError(401,
        'This token is wrong. Please login', {code: 'WRONG_TOKEN'}))

    static WrongCredentials: createHttpError.HttpError = createHttpError(createHttpError(401,
        'The credentials are not correct', {code: 'WRONG_CREDENTIALS'}))

    static AccountNotFound: createHttpError.HttpError = createHttpError(createHttpError(404,
        'This account does not exist.', {code: 'ACCOUNT_NOT_FOUND'}))

    static FunctionNotSupported: createHttpError.HttpError = createHttpError(createHttpError(404,
        'This weather forecast does not exist.', {code: 'NOT_SUPPORTED'}))

    static AccountAlreadyCreated: createHttpError.HttpError = createHttpError(createHttpError(401,
        'This email is already used by a created account', {code: 'ACCOUNT_ALREADY_CREATED'}))

    static UploadFailed: createHttpError.HttpError = createHttpError(createHttpError(400,
        'The file upload failed', {code: 'UPLOAD_FAILED'}))
        
    static FavoriteAlreadyCreated: createHttpError.HttpError = createHttpError(createHttpError(401,
        'This favorite is already owned by this user', {code: 'FAVORITE_ALREADY_CREATED'}))
        
    static FavoriteNotFound: createHttpError.HttpError = createHttpError(createHttpError(401,
        'This favorite does not exist', {code: 'FAVORITE_NOT_FOUND'}))
        
    static FavoriteNotDeleted: createHttpError.HttpError = createHttpError(createHttpError(401,//TODO incorrect code
        'This favorite has not been deleted', {code: 'FAVORITE_NOT_DELETED'}))

}
