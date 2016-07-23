import { Router } from 'express'
import path from 'path'
import multer from 'multer'
import { tryCatchMiddleware } from '../services/middleware-helper.js'
import { execSync } from 'child_process'
import config from '../../config.js'

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.resolve(__dirname, '../../uploads'))
  },
  filename(req, file, cb) {
    cb(null, file.originalname)
  },
})

const upload = multer({
  storage,
})

const router = new Router()

// make sure kubectl is up
router.use(tryCatchMiddleware(async (req, res, next) => {
  execSync(`which ${config.kubeBinary}`)
  execSync(`${config.kubeBinary} cluster-info`)
  next()
}))

// run apply on file and then delete file
router.post(
  `/`,
  upload.single(`data`),
  tryCatchMiddleware(async (req, res) => {
    const stdout = execSync(`${config.kubeBinary} get nodes
                            ${config.kubeBinary} get pods
                            ${config.kubeBinary} apply -f ${req.file.path}
                            `.trim()).toString()
    res.send(stdout)
  }),
)

export default router
