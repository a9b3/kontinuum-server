import { tryCatchMiddleware } from '../services/middleware-helper.js'

export default tryCatchMiddleware(async function keyAuth(req, res, next) {
  const token = req.headers && req.headers.token
  if (!token) throw new Error(`Must provide 'token' in headers`)
})
