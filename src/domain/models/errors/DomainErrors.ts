import * as createHttpError from 'http-errors'

export default class DomainErrors {

    static AuthFailed: createHttpError.HttpError = createHttpError(createHttpError(400,
        'Authentication token is wrong or missing', {code: 'AUTH_FAILED'}))
    static InvalidCode: createHttpError.HttpError = createHttpError(createHttpError(400,
        'Invalid verification code', {code: 'INVALID_CODE'}))
    static InvalidContentType: createHttpError.HttpError = createHttpError(createHttpError(400,
        'Invalid content type', {code: 'INVALID_CONTENT_TYPE'}))
    static MissingFriendRequest: createHttpError.HttpError = createHttpError(createHttpError(400,
        'Cannot find friend request', {code: 'MISSING_FRIEND_REQUEST'}))}
