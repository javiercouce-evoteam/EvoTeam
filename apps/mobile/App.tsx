import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { TamaguiProvider } from 'tamagui'
import config from '../../tamagui.config'
import { MyButton } from '@pospon/ui'


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on the app!</Text>
      <StatusBar style="auto" />
      <TamaguiProvider config={config}>
      <MyButton />
    </TamaguiProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
