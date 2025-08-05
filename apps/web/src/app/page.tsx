'use client'

import {
  Header,
  Footer,
  HeroSection,
  FeaturesSection,
  StatsSection
} from '@pospon/ui'
import { YStack, ScrollView } from 'tamagui'

// Deshabilitar SSG para esta página ya que usa componentes con tokens de tema
export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <YStack flex={1} backgroundColor="$background">
      <Header title="Pospon" showNavigation={true} />
      
      <ScrollView flex={1}>
        <YStack space="$0">
          <HeroSection
            title="Revoluciona tu Productividad"
            subtitle="La plataforma todo-en-uno para gestión de proyectos"
            description="Desde la planificación hasta la ejecución, Pospon te ayuda a mantener tus proyectos organizados, tu equipo sincronizado y tus objetivos claros."
            primaryButtonText="Comenzar Gratis"
            secondaryButtonText="Ver Demo"
          />
          
          <StatsSection />
          
          <FeaturesSection />
        </YStack>
      </ScrollView>
      
      <Footer />
    </YStack>
  )
}
