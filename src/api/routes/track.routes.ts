import { Router } from 'express'
import trackController from '../controllers/track.controller'

const router = Router()

router.post('/', trackController.trackData)

export default router
