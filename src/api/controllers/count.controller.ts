import { NextFunction, Request, Response } from 'express'
import { createCustomError } from '../../utils/helpers'

export const countController = {
  getCount: (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({
        ok: true,
        msg: 'Ok!'
      })
    } catch (error) {
      next(createCustomError(error, 2000))
    }
  }
}

export default countController
