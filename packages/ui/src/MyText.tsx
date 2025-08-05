import { Text } from 'tamagui'
import type { FC, ReactNode } from 'react'

export const MyText: FC<{ children: ReactNode }> = ({ children }) => {
  return <Text>{children}</Text>
}
