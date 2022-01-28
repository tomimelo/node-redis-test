import { Router } from 'express'
import countController from '../controllers/count.controller'

const router = Router()

router.get('/', countController.getCount)

export default router
