import { ObservedHydrologicalData } from '@/@types/observed-hydrological-data'
import { interpretationColors } from '@/constants/intepretation-colors'
import { STATIONS, Station } from '@/constants/stations'
import { useStationContext } from '@/hooks/useStationContext'
import { Link, router } from 'expo-router'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView, { Marker, Callout } from 'react-native-maps'

export default function Page() {
  const insets = useSafeAreaInsets(); 

  const { selectStation, recentObservedHydrologicalData } = useStationContext()

  function handleOpenStationPage(station: Station) {
    selectStation(station)
    router.navigate('../observedData');
  }

  interface CustomMapMarkerProps {
    data: ObservedHydrologicalData | undefined
  }

  function CustomMapMarker({ data }: CustomMapMarkerProps) {
    const interpretation = data?.climatologicalInterpretation
    const elevation = data?.elevation / 100

    if (interpretation) {
      return (
        <View
          style={[
            styles.markerContainer,
            { backgroundColor: interpretationColors[interpretation] },
          ]}
        >
          <Text
            style={[
              styles.markerText,
              {
                color:
                  interpretation === '-3' || interpretation === '3'
                    ? 'white'
                    : 'black',
              },
            ]}
          >
            {elevation?.toFixed(1)}
          </Text>
        </View>
      )
    }
  }

  return (
    <View style={styles.container}>
      <MapView
        style={[styles.map, { bottom: insets.bottom }]}
        initialRegion={{
          latitude: -9.9256,
          longitude: -63.0714,
          latitudeDelta: 8,
          longitudeDelta: 8,
        }}
        toolbarEnabled={false}
      >
        {STATIONS.map((station) => (
          <Marker
            key={station.id}
            coordinate={{
              latitude: station.latitude,
              longitude: station.longitude,
            }}
            onPress={() => handleOpenStationPage(station)}
            anchor={{x: 0.3, y: 0.3}} 
          >
            <CustomMapMarker
              data={recentObservedHydrologicalData.find(
                (e) => e.station_id === station.id
              )}
            />
          </Marker>
        ))}
     </MapView>
      <View style={[styles.logoContainer, { top: insets.top } ]}>
        <Image
          style={styles.logo}
          source={require('@/assets/images/labclim-logo-horizontal.png')}
        />
      </View>
      <View style={[styles.labelsContainer, { bottom: insets.bottom + 10}]}>
        <Image
          style={styles.labels}
          source={require('@/assets/images/labels.png')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 36,
    color: '#38434D',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  markerText: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  markerContainer: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '100%',
    borderWidth: 0.5,
    borderColor: 'black',
    // transform: [{ translateY: 20}]
  },
  labelsContainer: {
    position: 'absolute',
    borderRadius: 20,
  },
  labels: {
    width: 400,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  logo: {
    width: 170,
    height: 70,
    resizeMode: 'contain',
  },
  logoContainer: {
    position: 'absolute',
    right: 5,
    opacity: 0.8,
  },
})
