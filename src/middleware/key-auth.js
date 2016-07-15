import { tryCatchMiddleware } from '../services/middleware-helper.js'
import jwt from 'jsonwebtoken'
import config from '../../config.js'

export default tryCatchMiddleware(async function keyAuth(req, res, next) {
  const token = req.headers && req.headers.token
  if (!token) throw new Error(`Must provide 'token' in headers`)

  jwt.verify(token, config.secret, async e => {
    if (e) next(e)

    const tokenData = await redis.get(`${TOKEN}/${token}`)
    if (!tokenData) return next('Token not found')
    req.user = tokenData
    next()
  })
  .catch(next)
})
