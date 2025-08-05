import { YStack, XStack, Text, Card } from 'tamagui'

interface StatItemProps {
  number: string
  label: string
  color?: string
}

const StatItem = ({ number, label, color = "$blue10" }: StatItemProps) => (
  <YStack alignItems="center" space="$2" flex={1} minWidth={150}>
    <Text
      fontSize="$9"
      fontWeight="bold"
      color={color}
      lineHeight="$1"
    >
      {number}
    </Text>
    <Text
      fontSize="$4"
      color="$gray10"
      textAlign="center"
      fontWeight="500"
    >
      {label}
    </Text>
  </YStack>
)

const stats = [
  { number: "10K+", label: "Usuarios Activos", color: "$blue10" },
  { number: "50K+", label: "Proyectos Completados", color: "$green10" },
  { number: "99.9%", label: "Tiempo de Actividad", color: "$purple10" },
  { number: "24/7", label: "Soporte Técnico", color: "$orange10" }
]

export const StatsSection = () => {
  return (
    <YStack
      paddingHorizontal="$4"
      paddingVertical="$8"
      backgroundColor="$background"
    >
      <Card
        elevate
        bordered
        backgroundColor="$background"
        borderRadius="$6"
        padding="$6"
        space="$4"
      >
        <YStack space="$4" alignItems="center">
          <Text
            fontSize="$7"
            fontWeight="bold"
            textAlign="center"
            color="$color"
          >
            Números que Hablan por Sí Solos
          </Text>
          
          <XStack
            justifyContent="space-around"
            flexWrap="wrap"
            space="$4"
            width="100%"
          >
            {stats.map((stat, index) => (
              <StatItem
                key={index}
                number={stat.number}
                label={stat.label}
                color={stat.color}
              />
            ))}
          </XStack>
        </YStack>
      </Card>
    </YStack>
  )
}