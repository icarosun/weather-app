import {
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  Image,
  View,
} from 'react-native'

import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { format } from 'date-fns'
import { useStationContext } from '@/hooks/useStationContext'
import { formatNumericalData } from '@/utils/formatData'

export default function About() {
  return (
    <ThemedView style={styles.mainContainer}>
      <ThemedText type="default" style={{textAlign: 'justify'}}>
        Nós somos o <ThemedText type="defaultSemiBold">LabClim</ThemedText> - 
        Laboratório de Modelagem do Sistema Climático Terrestre. Nosso objetivo é fornecer uma estrutura computacional robusta a fim de apoiar 
        a formação de recursos humanos capacitados e qualificados em desenvolvimento nas áreas Ambiental, 
        Hidrologia, Clima, Variabilidade e Mudanças no Clima.
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  forecastRegisterContainer: {
    marginBottom: 20,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hydrologicalDataContainer: {
    marginBottom: 30,
  },
  hydrologicalDataTitle: {
    marginBottom: 20,
  },
  innerContainer: {
    marginLeft: 20,
    marginTop: 10,
  },
})
