import "./global.css"
import { StatusBar } from 'expo-status-bar';
import { TamaguiProvider, createTamagui } from 'tamagui'
import { config as tamaguiConfig } from '@tamagui/config/v2'

const config = createTamagui(tamaguiConfig)
import { 
  Header, 
  Footer, 
  HeroSection, 
  FeaturesSection, 
  StatsSection 
} from '@pospon/ui'
import { YStack, ScrollView } from 'tamagui'

export default function App() {
  return (
    <TamaguiProvider config={config}>
      <YStack flex={1} backgroundColor="$background">
        <StatusBar style="auto" />
        <Header title="Pospon" showNavigation={false} />
        
        <ScrollView flex={1}>
          <YStack space="$0">
            <HeroSection
              title="Pospon Mobile"
              subtitle="Gestión de proyectos en tu bolsillo"
              description="Mantén el control de tus proyectos desde cualquier lugar. Sincronización en tiempo real con tu equipo."
              primaryButtonText="Descargar App"
              secondaryButtonText="Explorar"
            />
            
            <StatsSection />
            
            <FeaturesSection />
          </YStack>
        </ScrollView>
        
        <Footer />
      </YStack>
    </TamaguiProvider>
  );
}
