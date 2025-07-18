const path = require('path')
const { getDefaultConfig } = require('expo/metro-config')

const projectRoot = __dirname
const workspaceRoot = path.resolve(projectRoot, '../../')

const config = getDefaultConfig(projectRoot)

// 👉 Añade watchFolders para que Metro observe el monorepo
config.watchFolders = [workspaceRoot]

// 👉 Resuelve correctamente node_modules en monorepo
config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, 'node_modules'),
    path.resolve(workspaceRoot, 'node_modules'),
]

// 👉 Añade extensiones si hay paquetes con .cjs, .mjs o SVGs
config.resolver.sourceExts = [
    ...config.resolver.sourceExts,
    'cjs',
    'mjs',
    'svg',
]

// 👉 Opcional: evita errores al importar SVGs (si los usas)
config.transformer = {
    ...config.transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
}

config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'svg')

module.exports = config