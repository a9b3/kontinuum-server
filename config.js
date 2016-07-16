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
    // run redis docker container before kontinuum
    // with option --link redis:db
    host: process.env.DB_PORT_6379_TCP_ADDR,
    namespace: 'KONTINUUM',
    port: process.env.DB_PORT_6379_TCP_PORT,
  },
}

export default Object.assign(
  {},
  config[env],
)
