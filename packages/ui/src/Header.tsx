import { XStack, YStack, Text, Button } from 'tamagui'

interface HeaderProps {
  title?: string
  showNavigation?: boolean
}

export const Header = ({ title = "Pospon", showNavigation = true }: HeaderProps) => {
  return (
    <XStack
      backgroundColor="$background"
      paddingHorizontal="$4"
      paddingVertical="$3"
      borderBottomWidth={1}
      borderBottomColor="$borderColor"
      justifyContent="space-between"
      alignItems="center"
      shadowColor="$shadowColor"
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.1}
      shadowRadius={4}
      elevation={3}
    >
      <Text
        fontSize="$6"
        fontWeight="bold"
        color="$color"
        letterSpacing={-0.5}
      >
        {title}
      </Text>
      
      {showNavigation && (
        <XStack space="$3" alignItems="center">
          <Button
            size="$3"
            variant="outlined"
            borderRadius="$10"
          >
            Inicio
          </Button>
          <Button
            size="$3"
            variant="outlined"
            borderRadius="$10"
          >
            Servicios
          </Button>
          <Button
            size="$3"
            backgroundColor="$blue10"
            color="white"
            borderRadius="$10"
          >
            Contacto
          </Button>
        </XStack>
      )}
    </XStack>
  )
}