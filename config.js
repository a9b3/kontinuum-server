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
  mongo: {
    host: 'docker.me',
    port: 27017,
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
  mongo: {
    host: 'localhost',
    port: 27017,
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
  mongo: {
    host: 'localhost',
    port: 27017,
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
  mongo: {
    host: 'localhost',
    port: 27017,
  },
}

export default Object.assign(
  {},
  config[env],
)
