import { NextFunction, Request, Response } from 'express'

export const exceptionHandler = {
  notFound: (req: Request, res: Response, next: NextFunction) => {
    const errorMessage = `${req.method} ${req.baseUrl} not found`
    console.log(`ERROR: ${errorMessage}`)
    res.status(404).json({
      ok: false,
      error: {
        status: 404,
        message: errorMessage
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

export default exceptionHandler
