import React, { useRef, useMemo, useCallback } from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText'

import { useStationContext } from '@/hooks/useStationContext'
import { Station } from '@/constants/stations'
import { StationMarker } from '@/components/StationMarker'
import DataObservedBottomSheet from '@/components/DataObservedBottomSheet'
import { BottomSheetModal, BottomSheetView, BottomSheetScrollView } from '@gorhom/bottom-sheet';


export default function Page() {
  const insets = useSafeAreaInsets()

  const { selectStation, recentObservedHydrologicalData } = useStationContext()

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['50%', '90.5%'], []);


  function isDangerStatus(danger) {
    return danger
  }

  function handleOpenStationPage(station: Station) {
    selectStation(station)
    handlePresentModalPress()
  }

  const handleClose = () => bottomSheetModalRef.current?.dismiss();

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  })

  const handleSheetChange = useCallback((index: number) => {
    console.log("handleChanges", index);
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFillObject}
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
        style={
          [styles.labelsContainer, {
            bottom: insets.bottom + 10,
          }]}
      >
        <Image
          style={styles.labels}
          source={require('@/assets/images/labels.png')}
        />
      </View>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        onChange={handleSheetChange}
        index={0}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
      >
        <View style={styles.header}>

          <Text style={styles.headerTitle} numberOfLines={1}>
            Humaitá
          </Text>

          <TouchableOpacity onPress={handleClose} style={styles.iconButton}>
            <Ionicons name="close" size={22} color="#0f172a" />
          </TouchableOpacity>
        </View>

        <BottomSheetScrollView contentContainerStyle={{ padding: 12 }}>

          <Text>Informações em tempo real sobre as condições hidroclimáticas.</Text>


          {/* River Level Card */}
          <View
            style={[
              styles.card,
              isDangerStatus(true) && styles.cardDanger,
            ]}
          >
            {/* NOVO: Localização */}
            {/* <View style={styles.locationContainer}> */}
            {/*   <Text style={styles.city}>HUMAITA/AM</Text> */}
            {/*   <Text style={styles.river}>Rio Madeira</Text> */}
            {/* </View> */}
            <View style={styles.locationRow}>
              <Ionicons name="water-outline" size={12} color="#6B7280" />
              <Text style={styles.locationText}>Rio Madeira</Text>

              <Text style={styles.dot}>·</Text>

              <Ionicons name="location-outline" size={12} color="#6B7280" />
              <Text style={styles.locationText}>HUMAITA/AM</Text>
            </View>

            <View style={styles.header}>
              <View
                style={[
                  styles.iconBox,
                  isDangerStatus(true)
                    ? styles.iconDanger
                    : styles.iconInfo,
                ]}
              >

                <Ionicons name="water" size={16} color={isDangerStatus(true) ? "#DC2626" : "#2563EB"} />
              </View>
              <Text style={styles.title}>Nível do Rio</Text>
            </View>

            <View style={styles.levelRow}>
              <View>
                <View style={styles.levelContainer}>
                  <Text
                    style={[
                      styles.levelValue,
                      isDangerStatus(true) && styles.textDanger,
                    ]}
                  >
                    10,99
                  </Text>
                  <Text style={styles.levelUnit}>m</Text>
                </View>
              </View>

              <View style={styles.variationContainer}>
                <View style={styles.variationRow}>
                  <Ionicons name="trending-up" size={14} color="#DC2626" />
                  <Text style={styles.variationText}>↑ 2 cm</Text>
                </View>
                <Text style={styles.variationLabel}>Variação Diária</Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* <View style={styles.grid}> */}
            {/*   <DataRow */}
            {/*     icon={<Calendar size={14} color="#6B7280" />} */}
            {/*     label="Data" */}
            {/*     value="22/10/2025 17:30h" */}
            {/*   /> */}
            {/*   <DataRow */}
            {/*     icon={<Waves size={14} color="#6B7280" />} */}
            {/*     label="Vazão" */}
            {/*     value="6753,38 m³/s" */}
            {/*   /> */}
            {/*   <DataRow */}
            {/*     icon={<CloudRain size={14} color="#6B7280" />} */}
            {/*     label="Chuva" */}
            {/*     value="0 mm" */}
            {/*   /> */}
            {/*   <DataRow */}
            {/*     icon={<MapPin size={14} color="#6B7280" />} */}
            {/*     label="Latitude" */}
            {/*     value="-7.5028" */}
            {/*   /> */}
            {/*   <DataRow */}
            {/*     icon={<Navigation size={14} color="#6B7280" />} */}
            {/*     label="Longitude" */}
            {/*     value="-63.0183" */}
            {/*   /> */}
            {/* </View> */}
          </View>

          {/* Forecast Section */}
          <View style={styles.card}>
            <View style={styles.header}>
              <View style={[styles.iconBox, styles.iconInfo]}>
                <Ionicons name="trending-up" size={16} color="#2563EB" />
              </View>
              <Text style={styles.title}>Previsão Hidrológica</Text>
            </View>

            {/* {forecasts.map((f, i) => ( */}
            {/*   <View key={i} style={styles.forecastCard}> */}
            {/*     <View style={styles.forecastHeader}> */}
            {/*       <Text style={styles.forecastDate}>{f.date}</Text> */}
            {/*       <Text style={styles.badge}>{f.status}</Text> */}
            {/*     </View> */}
            {/*     <Text style={styles.forecastLevel}>{f.level}</Text> */}
            {/*     <Text style={styles.forecastRange}>{f.range}</Text> */}
            {/*   </View> */}
            {/* ))} */}
          </View>

          {/* Meteorological Data */}
          <View style={styles.card}>
            <View style={styles.header}>
              <View style={[styles.iconBox, styles.iconInfo]}>
                <Ionicons name="cloud" size={16} color="#2563EB" />
              </View>
              <Text style={styles.title}>Dados Meteorológicos</Text>
            </View>

            <View style={styles.grid}>
              {/* <DataRow */}
              {/*   icon={<Thermometer size={14} color="#6B7280" />} */}
              {/*   label="Temperatura" */}
              {/*   value="31,10 °C" */}
              {/* /> */}
              {/* <DataRow */}
              {/*   icon={<Wind size={14} color="#6B7280" />} */}
              {/*   label="Umidade" */}
              {/*   value="60 %" */}
              {/* /> */}
            </View>
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
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
    right: 1,
    left: 1
  },
  labels: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  content: { padding: 20 },
  title: { fontSize: 20, fontWeight: "bold" },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ececec',
    backgroundColor: 'white', // Importante para não ficar transparente
  },
  headerTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    letterSpacing: -0.8,
  },
  closeButton: {
    padding: 4,
  },
  iconButton: {
    // w-9 h-9 rounded-xl bg-secondary
    width: 36,
    height: 36,
    borderRadius: 12, // rounded-xl
    backgroundColor: '#f1f5f9', // bg-secondary (cinza bem clarinho)
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: "#FFF", // fundo branco
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  cardDanger: {
    borderColor: "#FCA5A5",
  },

  card: {
    backgroundColor: "#FFF", // fundo branco
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  cardDanger: {
    borderColor: "#FCA5A5",
  },

  locationContainer: {
    marginBottom: 12,
  },

  city: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6B7280",
    letterSpacing: 1,
  },

  river: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },

  iconDanger: {
    backgroundColor: "#FEE2E2",
  },

  iconInfo: {
    backgroundColor: "#DBEAFE",
  },

  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  levelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  levelContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },

  levelValue: {
    fontSize: 48,
    fontWeight: "800",
    color: "#111827",
  },

  levelUnit: {
    fontSize: 18,
    marginLeft: 4,
    color: "#6B7280",
  },

  textDanger: {
    color: "#DC2626",
  },

  variationContainer: {
    alignItems: "flex-end",
  },

  variationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  variationText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#DC2626",
  },

  variationLabel: {
    fontSize: 12,
    color: "#6B7280",
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 16,
  },

  grid: {
    gap: 12,
  },

  dataRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dataRowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  dataLabel: {
    fontSize: 12,
    color: "#6B7280",
  },

  dataValue: {
    fontSize: 12,
    fontWeight: "500",
    color: "#111827",
  },

  forecastCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  forecastHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  forecastDate: {
    fontSize: 12,
    color: "#6B7280",
  },

  forecastLevel: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },

  forecastRange: {
    fontSize: 12,
    color: "#6B7280",
  },

  badge: {
    fontSize: 10,
    fontWeight: "600",
    color: "#2563EB",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4, // se não funcionar no seu RN, substitua por marginRight
    marginBottom: 8,
  },

  locationText: {
    fontSize: 12,
    color: "#6B7280", // muted
    fontWeight: "500",
  },

  dot: {
    fontSize: 12,
    color: "#9CA3AF",
    marginHorizontal: 4,
  },

})

