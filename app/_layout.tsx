import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '../theme/provider';
import { colors } from '../theme/tokens';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <StatusBar style="light" backgroundColor={colors.background.primary} translucent />
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: colors.background.primary },
              headerTintColor: colors.text.primary,
              headerTitleStyle: { color: colors.text.primary },
              headerShadowVisible: false,
              headerBackVisible: true,
              contentStyle: { backgroundColor: colors.background.primary },
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen 
              name="complaint/[id]" 
              options={{ 
                headerShown: false,
                presentation: 'card',
              }} 
            />
            <Stack.Screen 
              name="complaint/new" 
              options={{ 
                headerShown: false,
                presentation: 'modal',
              }} 
            />
            <Stack.Screen 
              name="selfie" 
              options={{ 
                headerTransparent: false,
                headerTitle: 'En Beğenilen Selfieler',
                headerTitleAlign: 'center',
              }} 
            />
            <Stack.Screen 
              name="sikayetlerim" 
              options={{ 
                headerTransparent: false,
                headerTitle: 'Şikayetlerim',
                headerTitleAlign: 'center',
              }} 
            />
            <Stack.Screen 
              name="kurumlar" 
              options={{ 
                headerTransparent: false,
                headerTitle: 'Kurumlar',
                headerTitleAlign: 'center',
              }} 
            />
          </Stack>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
