import { tryCatchMiddleware } from '../services/middleware-helper.js'
import jwt from 'jsonwebtoken'
import config from '../../config.js'
import promiredis from 'promiredis'

const TOKEN = 'TOKEN'

export default tryCatchMiddleware(async function keyAuth(req, res, next) {
  const token = req.headers && req.headers.token
  if (!token) throw new Error(`Must provide 'token' in headers`)

  jwt.verify(token, config.secret, async e => {
    if (e) next(e.toString())

    try {
      const tokenData = await promiredis.get(`${TOKEN}/${token}`)
      if (!tokenData) return next('Token not found')
      next()
    } catch (e) {
      next(e.toString())
    }
  })
})
