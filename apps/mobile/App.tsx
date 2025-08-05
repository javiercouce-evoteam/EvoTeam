import "./global.css"
import { Text, View } from "react-native";
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-4">
      <StatusBar style="auto" />
      <View className="bg-white p-6 rounded-lg shadow-lg items-center min-w-80">
        <Text className="text-2xl font-bold text-purple-600 mb-2">
          Pospon App Mobile
        </Text>
        <Text className="text-lg text-blue-500 mb-4">
          ¡NativeWind funcionando!
        </Text>
        <View className="bg-blue-500 px-6 py-3 rounded-lg">
          <Text className="text-white font-semibold">
            Botón con Tailwind
          </Text>
        </View>
      </View>
    </View>
  );
}
