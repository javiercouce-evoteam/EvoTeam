const path = require('path')

const nextConfig = {
  transpilePackages: ['@pospon/ui'],
  experimental: {
    optimizePackageImports: ['@pospon/ui']
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web'
    }

    return config
  }
}

module.exports = nextConfig
