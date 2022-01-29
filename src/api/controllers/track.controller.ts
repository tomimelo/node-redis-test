import { NextFunction, Request, Response } from 'express'
import { createCustomError } from '../../utils/helpers'
import FileService from '../services/file.service'
import RedisClient from '../services/redis.service'

export const TrackController = {
  trackData: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body
      await FileService.saveData(data)
      if (Object.prototype.hasOwnProperty.call(data, 'count')) {
        await RedisClient.saveCount(data.count)
      }

      res.json({
        ok: true,
        msg: 'Data tracked successfully'
      })
    } catch (error) {
      next(createCustomError(error, 1000))
    }
  }
}

export default TrackController
