import { Router } from 'express'
import { tryCatchMiddleware } from '../services/middleware-helper.js'
import { execSync } from 'child_process'
import config from '../../config.js'

const router = new Router()

// make sure kubectl is up
router.use(tryCatchMiddleware(async (req, res, next) => {
  execSync(`which ${config.kubeBinary}`)
  execSync(`${config.kubeBinary} cluster-info`)
  next()
}))

router.get(
  `/`,
  (req, res) => {
    const stdout = execSync(`${config.kubeBinary} get nodes
                            ${config.kubeBinary} get pods
                            ${config.kubeBinary} get componentstatuses
                            `.trim()).toString()
    res.send(stdout)
  },
)

export default router
