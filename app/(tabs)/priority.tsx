import React from 'react';
import { FlatList, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { ObservedHydrologicalData } from '@/@types/observed-hydrological-data'
import { useStationContext } from '@/hooks/useStationContext'
import { STATIONS, Station } from '@/constants/stations'
import { useEffect, useState } from 'react'
import { router } from 'expo-router'
import { ThemedText } from '@/components/ThemedText'
import { ClimatologicalInterpretation } from '@/components/ClimatologicalIntepretation'

export default function PriorityScreen() {
  const { selectStation, recentObservedHydrologicalData } = useStationContext()

  const [infoHydroData, setInfoHydroData] =
    useState<ObservedHydrologicalData>({} as ObservedHydrologicalData)

  useEffect(() => {
    setInfoHydroData(recentObservedHydrologicalData.filter((e) => e.climatologicalInterpretation == '3' || e.climatologicalInterpretation == '-3'));
  }, []);

  function getName(id_station) {
    const value = STATIONS.find((e) => e.id == id_station)

    return value.name;
  }

  function handleOpenStationPage(id_station) {
    const value = STATIONS.find((e) => e.id == id_station)

    selectStation(value)
    router.navigate('../observedData');
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={infoHydroData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleOpenStationPage(item.station_id)}
          >
            <View style={styles.cardContent}>
              <View>
                <ThemedText style={styles.nome}>{getName(item.station_id)}</ThemedText>

                <ClimatologicalInterpretation
                  style={{ alignSelf: "flex-start"}}
                  interpretation={
                    item.climatologicalInterpretation
                  }
                />
              </View>
              <Text style={styles.arrow}>{'>'}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  item: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
  nome: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
  }
});

