import { Image, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { router } from 'expo-router'

import { useStationContext } from '@/hooks/useStationContext'
import { Station } from '@/constants/stations'
import { CustomMapMarker } from '@/components/CustomMapMarker'
import { StationMarker } from '@/components/StationMarker'

export default function Page() {
  const insets = useSafeAreaInsets()
  const { selectStation, recentObservedHydrologicalData } =
    useStationContext()

  function handleOpenStationPage(station: Station) {
    selectStation(station)
    router.navigate('../observedData')
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={[styles.map, { bottom: insets.bottom }]}
        toolbarEnabled={false}
        initialRegion={{
          latitude: -9.9256,
          longitude: -63.0714,
          latitudeDelta: 8,
          longitudeDelta: 8,
        }}
      >
        {recentObservedHydrologicalData?.map(station => (
          <StationMarker
            key={station.id}
            station={station}
            onPress={() => handleOpenStationPage(station)}
          />
        ))}
      </MapView>

      <View style={[styles.logoContainer, { top: insets.top }]}>
        <Image
          style={styles.logo}
          source={require('@/assets/images/labclim-logo-horizontal.png')}
        />
      </View>

      <View
        style={[styles.labelsContainer, { bottom: insets.bottom + 10 }]}
      >
        <Image
          style={styles.labels}
          source={require('@/assets/images/labels.png')}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    position: 'absolute',
    right: 5,
    opacity: 0.8,
  },
  logo: {
    width: 170,
    height: 70,
    resizeMode: 'contain',
  },
  labelsContainer: {
    position: 'absolute',
  },
  labels: {
    width: 400,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 10,
  },
})

