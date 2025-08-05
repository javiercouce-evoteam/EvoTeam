import { YStack, XStack, Text, Card } from 'tamagui'

interface FeatureCardProps {
  icon?: string
  title: string
  description: string
  color?: string
}

export const FeatureCard = ({ 
  icon = "⭐", 
  title, 
  description, 
  color = "$blue10" 
}: FeatureCardProps) => {
  return (
    <Card
      elevate
      size="$4"
      bordered
      backgroundColor="$background"
      borderRadius="$6"
      padding="$4"
      space="$3"
      pressStyle={{ scale: 0.98 }}
      hoverStyle={{ borderColor: color }}
      animation="bouncy"
      maxWidth={350}
      minHeight={200}
    >
      <YStack space="$3" alignItems="center">
        <XStack
          width={60}
          height={60}
          backgroundColor={color}
          borderRadius="$10"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="$6">{icon}</Text>
        </XStack>
        
        <Text
          fontSize="$5"
          fontWeight="bold"
          color="$color"
          textAlign="center"
        >
          {title}
        </Text>
        
        <Text
          fontSize="$3"
          color="$gray10"
          textAlign="center"
          lineHeight="$2"
        >
          {description}
        </Text>
      </YStack>
    </Card>
  )
}