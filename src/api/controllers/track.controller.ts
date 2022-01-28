import { NextFunction, Request, Response } from 'express'
import { createCustomError } from '../../utils/helpers'
import FileService from '../services/file.service'

export const TrackController = {
  trackData: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body

      await FileService.saveData(data)

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
