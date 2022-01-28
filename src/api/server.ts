import express from 'express'
import cors from 'cors'

import apiRoutes from './routes/api.routes'
import exceptionHandler from './middlewares/exceptionHandler'
export default class Server {
  private app: express.Application

  constructor (public port: string | number) {
    this.app = express()
    this.app.use(cors())
    this.app.use(express.json())
    this.initRoutes()
    this.app.use(exceptionHandler.internal)
  }

  private initRoutes () {
    this.app.use('/api', apiRoutes)
    this.app.use('*', exceptionHandler.notFound)
  }

  start () {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`)
    })
  }
}
