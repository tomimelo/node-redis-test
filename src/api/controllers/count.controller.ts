import { NextFunction, Request, Response } from 'express'
import { createCustomError } from '../../utils/helpers'
import RedisService from '../services/redis.service'

export const CountController = {
  getCount: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const count = await RedisService.getCount()
      res.json({
        ok: true,
        count
      })
    } catch (error) {
      next(createCustomError(error, 2000))
    }
  }
}

export default CountController
