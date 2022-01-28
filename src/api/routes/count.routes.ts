import { Router } from 'express'
import CountController from '../controllers/count.controller'

const router = Router()

router.get('/', CountController.getCount)

export default router
