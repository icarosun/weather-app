import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5, Entypo, Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { ClimatologicalInterpretation } from '@/components/ClimatologicalIntepretation'

export default function Card (){

  return (
    <ThemedView style={styles.mainContainer}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type='title'>{"Humaitá"}</ThemedText>
        <ThemedText type='default'>Informações em tempo real sobre condições hídricas e meteorológicas</ThemedText>
      </ThemedView>

      <View style={styles.card}>
        <View style={styles.titleHeader}>
          <Ionicons name="water-outline" size={35} color="#0077B3" style={{ marginLeft: -4 }}/> 
          <Text style={styles.title}>Dados Hidrológicos</Text>
        </View>

        <ThemedText type="default" style={{marginBottom: 10}}>{"Rio Humaitá"}</ThemedText>
        
        <ClimatologicalInterpretation
          interpretation={
            "-3" 
          }
        />

        <View style={styles.separator} />

        <View style={styles.section}>
          <Entypo name="calendar" size={20} color="#555" />
          <Text style={styles.label}>Data:</Text>
          <Text style={styles.value}>{"Hoje"}</Text>
        </View>

        <View style={styles.section}>
          <MaterialCommunityIcons name="waves" size={20} color="#0077B3" />
          <Text style={styles.label}>Nível do Rio</Text>
          <Text style={styles.value}>{2} m</Text>
        </View>

        <View style={styles.section}>
          <MaterialCommunityIcons name="water-pump" size={20} color="#0077b6" />
          <Text style={styles.label}>Vazão:</Text>
          <Text style={styles.value}>{12} m³/s</Text>
        </View>

        <View style={styles.section}>
          <MaterialCommunityIcons name="weather-pouring" size={20} color="#0077b6" />
          <Text style={styles.label}>Chuva acumulada:</Text>
          <Text style={styles.value}>{32} mm</Text>
        </View>

        <View style={styles.separator} />

        <ThemedText style={styles.dataTitle} type='subtitle'>
          Previsão Hidrológica
        </ThemedText>

        <View style={styles.sectionPrognostico}>
          <View style={styles.cardPrognostico}>
            <Text>1 Mês</Text>
            <ThemedText>{1} m</ThemedText>
            <ClimatologicalInterpretation
              interpretation={
                "-3" 
              }
            />
          </View><View style={styles.cardPrognostico}>
            <Text>2 Meses</Text>
            <ThemedText>{"1,5"} m</ThemedText>
            <ClimatologicalInterpretation
              interpretation={
                "-3" 
              }
            />
          </View><View style={styles.cardPrognostico}>
            <Text>3 Meses</Text>
            <ThemedText>{3} m</ThemedText>
            <ClimatologicalInterpretation
              interpretation={
                "-2" 
              }
            />
          </View>

        </View>
      </View>

     <View style={styles.card}>
           {/* --- Seção Meteorológica --- */}

      <View style={styles.titleHeader}>
        <MaterialCommunityIcons name="weather-cloudy" size={35} color="#ff8500" /> 
        <Text style={styles.titleMeteor}>Dados Meteorológicos</Text>
      </View>

        <View style={styles.separator} />
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

      </View>
    </ThemedView> 
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
    marginTop: 10
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
    padding: 5,
    borderRadius: 8,
    marginHorizontal: 3, // espaço entre os cards
    alignItems: 'center',
  }
});
