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
import { Drawer } from 'expo-router/drawer';

import { useColorScheme } from '@/hooks/useColorScheme'
import { StationProvider } from '@/contexts/stationContext'

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
      <GestureHandlerRootView>
        <StationProvider>
          {/* <Stack> */}
          {/*   <Stack.Screen name='index' options={{ headerShown: true }} /> */}
          {/*   <Stack.Screen name='(tabs)' options={{ headerShown: false }} /> */}
          {/*   <Stack.Screen name='+not-found' /> */}
          {/* </Stack> */}
          <Drawer>
            <Drawer.Screen 
              name="index"
              options={{
                drawerLabel: 'Mapa',
                title: "Mapa"
              }}
            />
            <Drawer.Screen 
              name="whoWeAre"
              options={{
                drawerLabel: 'Quem somos?',
                title: "Quem somos?"
              }}
            />
          </Drawer>
        </StationProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
};
