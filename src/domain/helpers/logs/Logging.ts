import pino from 'pino'

export const pinoOpts = {
    redact: {
        paths: ['email', 'phone', 'password', 'secret'],
        censor: '**REDACTED**'
    },
    level: 'info',
    prettyPrint: {
        translateTime: 'yyyy-mm-dd HH:MM:ss',
        ignore: 'pid,hostname'
    }
}
export const logger = (module: string): pino.Logger => {
    return pino(pinoOpts).child({ module })
}
