import React from 'react';
import { ScrollView, ActivityIndicator, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5, Entypo, Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { ClimatologicalInterpretation } from '@/components/ClimatologicalIntepretation'
import { useStationContext } from '@/hooks/useStationContext'
import { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { ObservedHydrologicalData } from '@/@types/observed-hydrological-data'
import { ObservedMeteorologicalData } from '@/@types/observed-meteorological-data'
import { formatNumericalData } from '@/utils/formatData'
import { format } from 'date-fns'

export default function ObservedDataScreen (){
  const { station, recentObservedHydrologicalData } = useStationContext()

  const [observedHydrologicalData, setObservedHydrologicalData] =
    useState<ObservedHydrologicalData>({} as ObservedHydrologicalData)

  const [observedMeteorologicalData, setObservedMeteorologicalData] =
    useState<ObservedMeteorologicalData>({} as ObservedMeteorologicalData)

  const [forecastHydrologicalData, setForecastHydrologicalData] = useState<
      ForecastHydrologicalData[]
    >([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setObservedHydrologicalData(recentObservedHydrologicalData.find((e) => e.station_id == station.id));

    fetch(
      `https://labclim.uea.edu.br/api/hydrological-data/forecast/${station.id}`
    )
      .then((response) => response.json())
      .then((data) => {
        setForecastHydrologicalData(data)
        setLoading(false)
      })
      .catch((e) => console.error(e))

    fetch(
      `https://labclim.uea.edu.br/api/meteorological-data/observed/${station.id}`
    )
      .then((response) => response.json())
      .then((data) => {
        setObservedMeteorologicalData(data)
        setLoading(false)
      })
      .catch((e) => console.error(e))
  }, [])

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size='large' color={Colors.light.background} />
      </ThemedView>
    )
  }

  return (
    <ScrollView>
      <ThemedView style={styles.mainContainer}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type='title'>{station.name}</ThemedText>
          <ThemedText type='default'>Informações em tempo real sobre condições hidroclimáticas.</ThemedText>
        </ThemedView>

        {observedHydrologicalData.date && (
          <View style={styles.card}>
            <View style={styles.titleHeader}>
              <Ionicons name="water-outline" size={35} color="#0077B3" style={{ marginLeft: -4 }}/> 
              <Text style={styles.title}>Nível do Rio</Text>
            </View>
            
            <ClimatologicalInterpretation
              style={{ alignSelf: "flex-start"}}
              interpretation={
                observedHydrologicalData.climatologicalInterpretation
              }
            />

            <View style={styles.titleHeader}>
              <Text style={{fontWeight: '800', fontSize: 40, color: "#0077B3"}}>{formatNumericalData(observedHydrologicalData.elevation)}</Text>
              <Text style={{marginTop: 7, marginLeft: 6}}>m</Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.section}>
              <Entypo name="calendar" size={20} color="#555" />
              <Text style={styles.label}>Data:</Text>
              <Text style={styles.value}>{format(observedHydrologicalData.date, 'dd/MM/yyyy HH:mm') + 'h'}</Text>
            </View>

            <View style={styles.section}>
              <MaterialCommunityIcons name="water-pump" size={20} color="#0077b6" />
              <Text style={styles.label}>Vazão:</Text>
              <Text style={styles.value}>{formatNumericalData(observedHydrologicalData.flow)} m³/s</Text>
            </View>

            <View style={styles.section}>
              <MaterialCommunityIcons name="weather-pouring" size={20} color="#0077b6" />
              <Text style={styles.label}>Chuva acumulada:</Text>
              <Text style={styles.value}>{observedHydrologicalData.accumulated_rain} mm</Text>
            </View>

            <View style={styles.section}>
              <MaterialCommunityIcons name="latitude" size={20} color="#555" />
              <Text style={styles.label}>Latitude:</Text>
              <Text style={styles.value}>{station.latitude}</Text>
            </View>

            <View style={styles.section}>
              <MaterialCommunityIcons name="longitude" size={20} color="#555" />
              <Text style={styles.label}>Longitude:</Text>
              <Text style={styles.value}>{station.longitude}</Text>
            </View>

            <View style={styles.separator} />

            <ThemedText style={styles.dataTitle} type='subtitle'>
              Previsão Hidrológica
            </ThemedText>

            <View style={styles.sectionPrognostico}>
              {forecastHydrologicalData.map((forecastRegister) => (
                <View key={forecastRegister.id} style={styles.cardPrognostico}>
                  <Text>{format(forecastRegister.date, 'MM/yyyy')}</Text>
                  <ThemedText style={{marginVertical: 20, fontWeight: '900'}}>{formatNumericalData(forecastRegister.elevation)} m</ThemedText>
                  <ClimatologicalInterpretation
                    interpretation={
                      forecastRegister.climatologicalInterpretation 
                    }
                  />
                </View>
              ))}
              

              {/* <View style={styles.cardPrognostico }> */}
              {/*   <Text>2 Meses</Text> */}
              {/*   <ThemedText style={{marginVertical: 20, fontWeight: '900'}}>{"1,5"} m</ThemedText> */}
              {/*   <ClimatologicalInterpretation */}
              {/*     interpretation={ */}
              {/*       "0"  */}
              {/*     } */}
              {/*   /> */}
              {/* </View> */}
              {/**/}
              {/* <View style={styles.cardPrognostico}> */}
              {/*   <Text>3 Meses</Text> */}
              {/*   <ThemedText style={{marginVertical: 20, fontWeight: '900'}}>{"3,5"} m</ThemedText> */}
              {/*   <View style={styles.statusPrognostico}> */}
              {/*     <Text style={styles.textoSuperior}>Emergência</Text> */}
              {/*     <Text style={styles.textoInferior}>Inundação</Text> */}
              {/*   </View> */}
              {/* </View> */}

            </View>
          </View>
        )}

            {/* --- Seção Meteorológica --- */}

        {observedMeteorologicalData.date && (
          <View style={styles.card}>
            <View style={styles.titleHeader}>
              <MaterialCommunityIcons name="weather-cloudy" size={35} color="#ff8500" /> 
              <Text style={styles.titleMeteor}>Dados Meteorológicos</Text>
            </View>

            <View style={styles.separator} />
            <View style={styles.section}>
              <MaterialCommunityIcons name="thermometer" size={20} color="#ff8500" />
              <Text style={styles.label}>Temperatura:</Text>
              <Text style={styles.value}>{formatNumericalData(observedMeteorologicalData.temperature)} °C</Text>
            </View>

            <View style={styles.section}>
              <MaterialCommunityIcons name="water-percent" size={20} color="#ff8500" />
              <Text style={styles.label}>Umidade:</Text>
              <Text style={styles.value}>{observedMeteorologicalData.humidity} %</Text>
            </View>
          </View>
        )}
      </ThemedView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  label: {
    fontWeight: '600',
    color: '#555',
    flex: 1,
  },
  value: {
    fontWeight: '400',
    color: '#000',
  },
  cheia: {
    color: 'red',
    fontWeight: 'bold',
  },
  estiagem: {
    color: 'blue',
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 12,
  },
  button: {
    marginTop: 12,
    backgroundColor: '#ff8500',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  mainContainer: {
    flex: 1,
  },
  titleContainer: {
    justifyContent: 'space-between',
    margin: 16,
    marginBottom: 0
  }, 
  titleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  titleCard: {
    marginLeft: 2,             // espaçamento entre ícone e texto
    color: '#333',
    fontSize: 18,
  },
  titleMeteor: {
    marginLeft: 2,
  fontSize: 25,
    fontWeight: 'bold',
    color: '#333'
  },
  sectionPrognostico: {
    flexDirection: 'row',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 10,
  }, 
  cardPrognostico: {
    flex: 1,
    backgroundColor: '#e0f7ff',
    // backgroundColor: '#fff',
    padding: 5,
    borderRadius: 8,
    marginHorizontal: 3, // espaço entre os cards
    alignItems: 'center',
    justifyContent: 'center'
    // borderWidth: 1,
  },
  statusPrognostico: {
    padding: 8,
    alignItems: 'center', // Centraliza horizontalmente
    justifyContent: 'center', // Centraliza verticalmente
    backgroundColor: '#00008B',
    alignSelf: 'center',
    borderRadius: 16,
  },
  textoSuperior: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  textoInferior: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
});
