import { Router } from 'express'

import countRoutes from './count.routes'
import trackRoutes from './track.routes'

const router = Router()

router.use('/count', countRoutes)
router.use('/track', trackRoutes)

export default router
