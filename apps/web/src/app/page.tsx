'use client'

import { TamaguiProvider } from 'tamagui'
import config from 'tamagui.config'
import { MyButton } from '@pospon/ui'
import { MyText } from '@pospon/ui'


export default function Page() {
  return (
    <TamaguiProvider config={config}>
      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-5xl font-extrabold text-center text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text mb-8">
          Pospon App
        </h1>
        <h2 className="text-3xl font-bold underline text-blue-600 mb-4">
          Hello world with Tailwind CSS!
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <MyButton />
          <MyText>Hello desde web</MyText>
        </div>
      </div>
    </TamaguiProvider>
  )
}
