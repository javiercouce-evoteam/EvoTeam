import path from 'path'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
  },
  webpack(config) {
    // Alias para React Native Web
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
      '@pospon/ui': path.resolve(__dirname, '../../packages/ui/src'),
    }

    // Asegurarse de transpilar el paquete @pospon/ui
    config.module.rules.push({
      test: /\.[jt]sx?$/,
      include: [path.resolve(__dirname, '../../packages/ui')],
      use: {
        loader: 'babel-loader',
        options: {
          babelrc: false,
          configFile: false,
          presets: ['next/babel'],
          plugins: ['@tamagui/babel-plugin'],
        },
      },
    })

    return config
  },
}

export default nextConfig