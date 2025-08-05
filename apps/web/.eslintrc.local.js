module.exports = {
  extends: ['./eslint.config.mjs'],
  rules: {
    // Permitir 'any' en archivos de configuración de Tamagui
    '@typescript-eslint/no-explicit-any': 'off',
  },
  overrides: [
    {
      files: ['**/TamaguiClientProvider.tsx', '**/tamagui.config.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
      },
    },
  ],
}