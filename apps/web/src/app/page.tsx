'use client'

import { TamaguiProvider } from 'tamagui'
import config from 'tamagui.config'
import { MyButton } from '@pospon/ui'
import { MyText } from '@pospon/ui'


export default function Page() {
  return (
    <TamaguiProvider config={config}>
      <MyButton />
      <MyText>Hello desde web</MyText>

    </TamaguiProvider>
  )
}
