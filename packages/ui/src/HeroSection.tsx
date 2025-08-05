import { YStack, XStack, Text, Button, Card } from 'tamagui'

interface HeroSectionProps {
  title?: string
  subtitle?: string
  description?: string
  primaryButtonText?: string
  secondaryButtonText?: string
}

export const HeroSection = ({
  title = "Bienvenido a Pospon",
  subtitle = "La revolución en gestión de proyectos",
  description = "Organiza, planifica y ejecuta tus proyectos de manera eficiente con nuestra plataforma innovadora.",
  primaryButtonText = "Comenzar ahora",
  secondaryButtonText = "Ver demo"
}: HeroSectionProps) => {
  return (
    <YStack
      paddingHorizontal="$4"
      paddingVertical="$8"
      alignItems="center"
      space="$6"
      backgroundColor="$background"
    >
      <YStack space="$4" alignItems="center" maxWidth={800}>
        <Text
          fontSize="$10"
          fontWeight="bold"
          textAlign="center"
          color="$blue10"
          lineHeight="$1"
        >
          {title}
        </Text>
        
        <Text
          fontSize="$6"
          fontWeight="600"
          textAlign="center"
          color="$gray11"
          lineHeight="$2"
        >
          {subtitle}
        </Text>
        
        <Text
          fontSize="$4"
          textAlign="center"
          color="$gray10"
          lineHeight="$3"
          maxWidth={600}
        >
          {description}
        </Text>
      </YStack>
      
      <XStack space="$3" flexWrap="wrap" justifyContent="center">
        <Button
          size="$5"
          backgroundColor="$blue10"
          color="white"
          borderRadius="$10"
          paddingHorizontal="$6"
          fontWeight="600"
          pressStyle={{ scale: 0.95 }}
          hoverStyle={{ backgroundColor: "$blue11" }}
        >
          {primaryButtonText}
        </Button>
        
        <Button
          size="$5"
          variant="outlined"
          borderColor="$blue10"
          color="$blue10"
          borderRadius="$10"
          paddingHorizontal="$6"
          fontWeight="600"
          pressStyle={{ scale: 0.95 }}
          hoverStyle={{ backgroundColor: "$blue2" }}
        >
          {secondaryButtonText}
        </Button>
      </XStack>
    </YStack>
  )
}