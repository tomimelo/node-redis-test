import { Router } from 'express'
import TrackController from '../controllers/track.controller'

const router = Router()

router.post('/', TrackController.trackData)

export default router
