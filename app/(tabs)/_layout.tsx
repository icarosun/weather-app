import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { StatusBar } from 'expo-status-bar';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" style="light" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
        }}>
        <Tabs.Screen 
          name="index" 
          options={{ 
            title: 'Mapa',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'map' : 'map-outline'} color={color} />
            ),
          }} 
        />
        <Tabs.Screen
          name="observedDataScreen"
          options={{
            title: 'Dados Observados',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="forecastDataScreen"
          options={{
            title: 'Previsão',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen 
          name="whoWeAre"
          options={{
            title: 'Sobre',
            headerShown: true,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'information-circle' : 'information-circle-outline'} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
