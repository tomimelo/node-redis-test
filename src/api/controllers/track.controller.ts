import { NextFunction, Request, Response } from 'express'

export const trackController = {
  trackData: (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({
        ok: true,
        msg: 'Ok!'
      })
    } catch (error) {
      next(error)
    }
  }
}

export default trackController
