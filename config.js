const path = require('path')
const env = process.env.NODE_ENV || 'dev'
const SUPER_INSECURE_KEY = process.env.SUPER_INSECURE_KEY
const PORT = process.env.PORT || 8080
const KUBE_BINARY = process.env.KUBE_BINARY || 'kubectl'

const config = {}

config.dev = {
  kubeBinary: KUBE_BINARY,
  port: PORT,
  secret: 'topsecret',
  superInsecureKey: SUPER_INSECURE_KEY,
  redis: {
    host: 'localhost',
    port: 6379,
    namespace: 'KONTINUUM',
  },
}

config.prod = {
  kubeBinary: path.resolve(process.cwd(), KUBE_BINARY),
  port: PORT,
  secret: 'topsecret',
  superInsecureKey: SUPER_INSECURE_KEY,
  redis: {
    // besure to run redis before running kontinuum
    host: 'localhost',
    namespace: 'KONTINUUM',
    port: 6379,
  },
}

export default config[env]
