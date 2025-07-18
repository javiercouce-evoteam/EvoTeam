const path = require('path')
const { getDefaultConfig } = require('expo/metro-config')

const projectRoot = __dirname
const workspaceRoot = path.resolve(__dirname, '../../')

// 1. Rutas absolutas a los paquetes externos que deben transpilarse
const watchFolders = [workspaceRoot]

// 2. Forzar a Metro a usar el `node_modules` del workspace, no del subpaquete
const extraNodeModules = {
  '@pospon/ui': path.join(workspaceRoot, 'packages/ui'),
}

const config = getDefaultConfig(projectRoot)

config.watchFolders = watchFolders

config.resolver.extraNodeModules = {
  ...extraNodeModules,
  react: path.join(workspaceRoot, 'node_modules/react'),
  'react-native': path.join(workspaceRoot, 'node_modules/react-native'),
}

config.resolver.sourceExts.push('cjs')

module.exports = config
