import { ObservedHydrologicalData } from '@/@types/observed-hydrological-data'
import { interpretationColors } from '@/constants/intepretation-colors'
import { STATIONS, Station } from '@/constants/stations'
import { useStationContext } from '@/hooks/useStationContext'
import { Link, router } from 'expo-router'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps'
import { SvgXml } from 'react-native-svg';

const getSvg = (text, colorText, colorCircle) => `<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
    <circle cx="25" cy="25" r="18" fill="${colorCircle}" stroke="black" stroke-width="0.5" />
    <text x="25" y="32" font-size="14" fill="${colorText}" text-anchor="middle" font-family="Arial" font-weight="bold">${text}</text>
  </svg>`

export default function Page() {
  const insets = useSafeAreaInsets(); 

  const { selectStation, recentObservedHydrologicalData } = useStationContext()

  function handleOpenStationPage(station: Station) {
    selectStation(station)
    router.push('/(tabs)/observedDataScreen')
  }

  interface CustomMapMarkerProps {
    data: ObservedHydrologicalData | undefined
  }

  function CustomMapMarker({ data }: CustomMapMarkerProps) {
    const interpretation = data?.climatologicalInterpretation
    const elevation = data?.elevation

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

  function CustomTestMarker({ data }: CustomMapMarkerProps) {

    const interpretation = data?.climatologicalInterpretation
    const elevation = data?.elevation

    var colorText = "black"
    var colorCircle = "black"

    if (interpretation) {
      if (interpretation === '-3' || interpretation === '3') {
        colorText = "white"
      }
    
      colorCircle = interpretationColors[interpretation];
      
      return (<SvgXml xml={getSvg(elevation?.toFixed(1), colorText, colorCircle)} width="50" height="40" />);
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
            // title={station.name}
            onPress={() => handleOpenStationPage(station)}
            anchor={{x: 0.5, y: 0.6}}
          >
            {/* <CustomMapMarker */}
            {/*   data={recentObservedHydrologicalData.find( */}
            {/*     (e) => e.station_id === station.id */}
            {/*   )} */}
            {/* /> */}
            <CustomTestMarker data={recentObservedHydrologicalData.find((e) => e.station_id === station.id)} />  
          </Marker>
        ))}
      </MapView>
      <View style={[styles.logoContainer, { top: insets.top}]}>
        <Image
          style={styles.logo}
          source={require('@/assets/images/labclim-logo-horizontal.png')}
        />
      </View>
      <View style={[styles.labelsContainer, { bottom: insets.bottom + 8}]}>
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
    width: 130,
    height: 50,
    resizeMode: 'contain',
  },
  logoContainer: {
    position: 'absolute',
    right: 5,
    opacity: 0.8,
  },
  markerContainerTest: {
    alignItems: 'center',
  },
  pinHead: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
    pinText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  pinTail: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'white',
    marginTop: -1,
  }
})
