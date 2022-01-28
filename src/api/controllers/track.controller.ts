import { NextFunction, Request, Response } from 'express'
import { createCustomError } from '../../utils/helpers'

export const trackController = {
  trackData: (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({
        ok: true,
        msg: 'Ok!'
      })
    } catch (error) {
      next(createCustomError(error, 1000))
    }
  }
}

export default trackController