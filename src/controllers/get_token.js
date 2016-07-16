import jwt from 'jsonwebtoken'
import { tryCatchMiddleware } from '../services/middleware-helper.js'
import promiredis from 'promiredis'
import uuid from 'node-uuid'
import config from '../../config.js'

const TOKEN = `TOKEN`
const TOKEN_EXPIRE_WEEK = 12
const TOKEN_EXPIRE_DAY = TOKEN_EXPIRE_WEEK * 7
const TOKEN_EXPIRE_HOUR = TOKEN_EXPIRE_DAY * 24
const TOKEN_EXPIRE_MIN = TOKEN_EXPIRE_HOUR * 60
const TOKEN_EXPIRE_SEC = TOKEN_EXPIRE_MIN * 60

export default tryCatchMiddleware(async (req, res) => {
  const {
    password,
  } = req.body

  if (password !== config.superInsecureKey) {
    throw new Error('Password is not correct.')
  }

  const token = jwt.sign({
    id: uuid.v4(),
  }, config.secret, {
    expiresIn: TOKEN_EXPIRE_SEC,
  })

  await promiredis.set(`${TOKEN}/${token}`, true)
  await promiredis.expire(`${TOKEN}/${token}`, TOKEN_EXPIRE_SEC)
  res.send({ token })
})
