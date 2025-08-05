const nextConfig = {
  reactStrictMode: true,
  env: {
    TAMAGUI_CONFIG: '../../tamagui.config.ts',
  },
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
      '@pospon/ui': path.resolve(__dirname, '../../packages/ui/src'),
    }

    config.module.rules.push({
      test: /\.[jt]sx?$/,
      include: [path.resolve(__dirname, '../../packages/ui')],
      use: {
        loader: 'babel-loader',
        options: {
          babelrc: false,
          configFile: false,
          presets: ['next/babel'],
          plugins: [
            [
              '@tamagui/babel-plugin',
              {
                components: ['@pospon/ui'],
                config: '../../tamagui.config.ts',
                importsWhitelist: ['constants.js', 'colors.js'],
                logTimings: true,
              },
            ],
          ],
        },
      },
    })

    return config
  },
}
