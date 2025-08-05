'use client'

import { TamaguiProvider, createTamagui } from 'tamagui'
import { config } from '@tamagui/config/v2'
import { ReactNode } from 'react'

interface TamaguiClientProviderProps {
  children: ReactNode
}

// Crear la configuración de Tamagui con tipos flexibles para evitar conflictos
const tamaguiConfig = createTamagui(config as any)

export default function TamaguiClientProvider({ children }: TamaguiClientProviderProps) {
  return (
    <TamaguiProvider config={tamaguiConfig as any} defaultTheme="light">
      {children}
    </TamaguiProvider>
  )
}