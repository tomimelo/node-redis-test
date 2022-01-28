import { NextFunction, Request, Response } from 'express'

export const countController = {
  getCount: (req: Request, res: Response, next: NextFunction) => {
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

export default countController
