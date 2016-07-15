import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import router from './router.js'
import promiredis from 'promiredis'
import config from '../config.js'

export default class Server {
  _bootstrap = () => {
    this.app.use(cors())
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: false }))
  }

  _setupRouter = () => {
    this.app.use(router)
  }

  constructor() {
    this.app = express()
    this.server = undefined

    this._bootstrap()
    this._setupRouter()
  }

  async _initialize() {
    promiredis.initialize(config.redis)
  }

  listen(port = 8080) {
    return new Promise(async (resolve, reject) => {
      await this._initialize()

      this.server = this.app.listen(port, (e) => {
        if (e) return reject(e)
        resolve()
      })
    })
  }

  async stop() {
    if (!this.server) return
    await this.server.close()
  }
}
