import * as fastify from 'fastify'
import { FastifyInstance } from 'fastify'
import * as formbody from 'fastify-formbody'
import multer from 'fastify-multer'
import {IModule} from '../domain/helpers/module/IModule'

export default class HttpGateway implements IModule {

    private readonly instance: FastifyInstance

    constructor() {
        this.instance = fastify({
            logger: true
        })
        this.install()
    }

    get router(): FastifyInstance {
        return this.instance

    }

    get port() {
        return process.env.PORT ? parseInt(process.env.PORT, 10) : 8080
    }

    install() {
        this.instance.register(formbody)
        this.instance.register(multer.contentParser)
    }

    async start() {
        await this.instance.listen(this.port, '0.0.0.0')
    }

    async stop() {
        await this.instance.close()
    }

    isDatabase() {
        return false
    }

    isHttp() {
        return true
    }

}
