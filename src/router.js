import { Router } from 'express'
import index from './controllers/index.js'
import deploy from './controllers/deploy.js'
import healthCheck from './controllers/health_check.js'
import getToken from './controllers/get_token.js'
import keyAuth from './middleware/key-auth.js'

const router = new Router()

router.get(`/`, index)
router.use(`/deploy`, keyAuth, deploy)
router.use(`/health_check`, healthCheck)
router.post(`/get_token`, getToken)

export default router
