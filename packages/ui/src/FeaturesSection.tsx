import { YStack, XStack, Text } from 'tamagui'
import { FeatureCard } from './FeatureCard'

const features = [
  {
    icon: "🚀",
    title: "Gestión Ágil",
    description: "Metodologías ágiles integradas para maximizar la productividad de tu equipo.",
    color: "$blue10"
  },
  {
    icon: "📊",
    title: "Analytics Avanzados",
    description: "Métricas detalladas y reportes en tiempo real para tomar mejores decisiones.",
    color: "$green10"
  },
  {
    icon: "🔒",
    title: "Seguridad Total",
    description: "Protección de datos de nivel empresarial con encriptación end-to-end.",
    color: "$purple10"
  },
  {
    icon: "🌐",
    title: "Colaboración Global",
    description: "Trabaja con tu equipo desde cualquier lugar del mundo en tiempo real.",
    color: "$orange10"
  },
  {
    icon: "⚡",
    title: "Automatización",
    description: "Automatiza tareas repetitivas y enfócate en lo que realmente importa.",
    color: "$yellow10"
  },
  {
    icon: "🎯",
    title: "Objetivos Claros",
    description: "Define y rastrea objetivos con métricas precisas y alcanzables.",
    color: "$red10"
  }
]

export const FeaturesSection = () => {
  return (
    <YStack
      paddingHorizontal="$4"
      paddingVertical="$8"
      space="$6"
      backgroundColor="$gray1"
    >
      <YStack space="$3" alignItems="center">
        <Text
          fontSize="$8"
          fontWeight="bold"
          textAlign="center"
          color="$color"
        >
          Características Principales
        </Text>
        <Text
          fontSize="$4"
          textAlign="center"
          color="$gray10"
          maxWidth={600}
          lineHeight="$2"
        >
          Descubre todas las herramientas que necesitas para llevar tus proyectos al siguiente nivel
        </Text>
      </YStack>
      
      <XStack
        flexWrap="wrap"
        justifyContent="center"
        space="$4"
        gap="$4"
      >
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            color={feature.color}
          />
        ))}
      </XStack>
    </YStack>
  )
}