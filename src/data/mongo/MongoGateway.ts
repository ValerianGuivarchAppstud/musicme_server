import {logger} from '../../domain/helpers/logs/Logging'
import * as mongoose from 'mongoose'
import {IModule} from '../../domain/helpers/module/IModule'
import {forClass} from '../../domain/models/logs/Logging'

export default class MongoGateway implements IModule {

  private readonly uri: string
  private readonly retries: number
  private readonly retryDelay: number
  private logger = forClass('MongoGateway')

  constructor() {
    this.uri = process.env.MONGODB_URI
    this.retries = 3
    this.retryDelay = 3000
  }

  private async connect(tries: number = 0): Promise<void> {
    try {
      await mongoose.connect(this.uri, {useNewUrlParser: true, useUnifiedTopology: true })
    } catch (e) {
      this.logger.error(`Unable to connect to mongo ${this.uri}:`, e)
      if (tries < this.retries) {
        this.logger.error(`Waiting ${this.retryDelay} ms before retrying ... (Retry ${tries + 1} / ${this.retries})`)
        await new Promise(resolve => setTimeout(resolve, this.retryDelay))
        return this.connect(tries + 1)
      }
      throw e
    }
  }

  async start() {
    await this.connect()
    return
  }

  async stop() {
    await mongoose.disconnect()
  }

  isDatabase() {
    return true
  }

  isHttp() {
    return false
  }
}
