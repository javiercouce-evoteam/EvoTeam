import { XStack, YStack, Text, Button } from 'tamagui'

export const Footer = () => {
  return (
    <YStack
      backgroundColor="$gray2"
      paddingHorizontal="$4"
      paddingVertical="$6"
      borderTopWidth={1}
      borderTopColor="$borderColor"
      space="$4"
    >
      <XStack justifyContent="space-between" flexWrap="wrap" space="$4">
        <YStack space="$2" flex={1} minWidth={200}>
          <Text fontSize="$5" fontWeight="bold" color="$color">
            Pospon
          </Text>
          <Text fontSize="$3" color="$gray10" lineHeight="$1">
            La plataforma que revoluciona la forma de gestionar tus proyectos y tareas.
          </Text>
        </YStack>
        
        <YStack space="$2" flex={1} minWidth={150}>
          <Text fontSize="$4" fontWeight="600" color="$color" marginBottom="$2">
            Enlaces
          </Text>
          <Text fontSize="$3" color="$gray10">Inicio</Text>
          <Text fontSize="$3" color="$gray10">Servicios</Text>
          <Text fontSize="$3" color="$gray10">Acerca de</Text>
          <Text fontSize="$3" color="$gray10">Contacto</Text>
        </YStack>
        
        <YStack space="$2" flex={1} minWidth={150}>
          <Text fontSize="$4" fontWeight="600" color="$color" marginBottom="$2">
            Contacto
          </Text>
          <Text fontSize="$3" color="$gray10">info@pospon.com</Text>
          <Text fontSize="$3" color="$gray10">+1 (555) 123-4567</Text>
        </YStack>
      </XStack>
      
      <XStack
        justifyContent="center"
        paddingTop="$4"
        borderTopWidth={1}
        borderTopColor="$borderColor"
      >
        <Text fontSize="$2" color="$gray10">
          © 2024 Pospon. Todos los derechos reservados.
        </Text>
      </XStack>
    </YStack>
  )
}