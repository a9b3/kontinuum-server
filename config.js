const env = process.env.NODE_ENV || 'dev'
const path = require('path')

const config = {}

const envOverrides = {
  port: process.env.PORT,
  kubeBinary: process.env.KUBE_BINARY || 'kubectl',
}

config.dev = {
  kubeBinary: envOverrides.kubeBinary,
  port: envOverrides.port || 8080,
  secret: 'topsecret',
  superInsecureKey: require('./.secret.js'),
  appId: '',
  redis: {
    host: 'docker.me',
    port: 6379,
    namespace: 'KONTINUUM',
  },
}

config.prod = {
  kubeBinary: envOverrides.kubeBinary,
  port: envOverrides.port || 80,
  secret: 'topsecret',
  superInsecureKey: require('./.secret.js'),
  appId: '',
  redis: {
    // besure to run redis before running kontinuum
    host: 'localhost',
    namespace: 'KONTINUUM',
    port: 6379,
  },
}

export default Object.assign(
  {},
  config[env],
)
