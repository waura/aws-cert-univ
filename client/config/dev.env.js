'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URL: '"http://192.168.33.10.xip.io:3000"',
  API_ENDPOINT: '"http://192.168.33.10.xip.io:3000"'

})
