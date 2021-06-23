import { Logger as PinoLogger } from 'pino'
import * as pino from 'pino'

export const Logger = pino({
    redact: {
        paths: ['email', 'phone', 'password', 'secret'],
        censor: '**REDACTED**'
    },
    level: 'info'
})
export const forClass = (module: string): PinoLogger => Logger.child({ module })
