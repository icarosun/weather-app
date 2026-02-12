import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

import { useColorScheme } from '@/hooks/useColorScheme'
import { StationProvider } from '@/contexts/stationContext'
import { SafeAreaProvider } from 'react-native-safe-area-context'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <StationProvider>
            <SafeAreaProvider>
              <Stack>
                <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
                <Stack.Screen name='observedData' options={{ headerShown: true, title: "Dados observados" }} />
                <Stack.Screen name='+not-found' />
              </Stack>
            </SafeAreaProvider>
          </StationProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
};
