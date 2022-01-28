import { NextFunction, Request, Response } from 'express'

export default {
  notFound: (req: Request, res: Response, next: NextFunction) => {
    console.log(`ERROR: ${req.baseUrl} not found`)
    res.status(404).json({
      ok: false,
      error: {
        status: 404,
        message: `${req.baseUrl} not found`
      }
    })
  },
  internal: (error: any, req: Request, res: Response, next: NextFunction) => {
    console.log(`${error.message} - code: ${error.code} ${error.stack ? '\n' + error.stack : ''}`)
    res.status(error.status || 500)
    res.json({
      ok: false,
      error: {
        status: error.status || 500,
        message: error.message || 'Internal server error',
        code: error.code || -1,
        data: error.data
      }
    })
  }
}
