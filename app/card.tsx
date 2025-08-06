import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5, Entypo } from '@expo/vector-icons';

export default function Card (){

  return (
     <View style={styles.card}>
      {/* --- Seção Hidrológica --- */}
      <Text style={styles.title}>
        <FontAwesome5 name="water" size={18} color="#0077b6" /> Hidrológicas
      </Text>

      <View style={styles.section}>
        <MaterialCommunityIcons name="waves" size={20} color="#0077b6" />
        <Text style={styles.label}>Nível do rio:</Text>
        <Text style={styles.value}>{18} m</Text>
      </View>

      <View style={styles.section}>
        <Entypo name="calendar" size={20} color="#555" />
        <Text style={styles.label}>Data:</Text>
        <Text style={styles.value}>{"Hoje"}</Text>
      </View>

      <View style={styles.section}>
        <FontAwesome5 name="exclamation-triangle" size={20} color={'red'} />
        <Text style={styles.label}>Situação:</Text>
        <Text style={[styles.value, styles.cheia]}>
          {"Cheia"}
        </Text>
      </View>

      <View style={styles.section}>
        <MaterialCommunityIcons name="water-pump" size={20} color="#0077b6" />
        <Text style={styles.label}>Vazão:</Text>
        <Text style={styles.value}>{12} m³/s</Text>
      </View>

      <View style={styles.section}>
        <MaterialCommunityIcons name="weather-pouring" size={20} color="#0077b6" />
        <Text style={styles.label}>Chuva acumulada:</Text>
        <Text style={styles.value}>{121212121212121212121212} mm</Text>
      </View>

      {/* --- Separador --- */}
      <View style={styles.separator} />

      {/* --- Seção Meteorológica --- */}
      <Text style={styles.title}>
        <MaterialCommunityIcons name="weather-cloudy" size={18} color="#ff8500" /> Meteorológicas
      </Text>

      <View style={styles.section}>
        <MaterialCommunityIcons name="thermometer" size={20} color="#ff8500" />
        <Text style={styles.label}>Temperatura:</Text>
        <Text style={styles.value}>{12} °C</Text>
      </View>

      <View style={styles.section}>
        <MaterialCommunityIcons name="water-percent" size={20} color="#ff8500" />
        <Text style={styles.label}>Umidade:</Text>
        <Text style={styles.value}>{12} %</Text>
      </View>

      {/* --- Botão de Previsão --- */}

    </View> );
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
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
});
