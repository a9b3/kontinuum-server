const env = process.env.NODE_ENV || 'dev'

const config = {}

const envOverrides = {
  port: process.env.PORT,
}

config.dev = {
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

config.test = {
  port: envOverrides.port || 8080,
  secret: 'topsecret',
  superInsecureKey: require('./.secret.js'),
  appId: '',
  redis: {
    host: 'localhost',
    namespace: 'KONTINUUM_TEST',
    port: 6379,
  },
}

config.travis = {
  port: envOverrides.port || 8080,
  secret: 'topsecret',
  superInsecureKey: require('./.secret.js'),
  appId: '',
  redis: {
    host: 'localhost',
    namespace: 'KONTINUUM_TEST',
    port: 6379,
  },
}

config.prod = {
  port: envOverrides.port || 8080,
  secret: 'topsecret',
  superInsecureKey: require('./.secret.js'),
  appId: '',
  redis: {
    host: 'localhost',
    namespace: 'KONTINUUM',
    port: 6379,
  },
}

export default Object.assign(
  {},
  config[env],
)
