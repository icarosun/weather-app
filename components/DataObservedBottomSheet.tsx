import React, { useMemo, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

type StatusType = "normal" | "warning" | "alert" | "emergency";

interface ForecastItem {
  date: string;
  level: string;
  range: string;
  status: StatusType;
}

const forecasts: ForecastItem[] = [
  { date: "05/11/2025", level: "10,79 m", range: "10,27 m - 11,32 m", status: "warning" },
  { date: "20/11/2025", level: "11,83 m", range: "10,81 m - 12,85 m", status: "alert" },
  { date: "05/12/2025", level: "13,71 m", range: "12,26 m - 15,16 m", status: "emergency" },
];

const isDangerStatus = (s: StatusType) =>
  s === "alert" || s === "emergency";

export default function DataObservedBottomSheet() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["50%", "90%"], []);

  const currentStatus: StatusType = "emergency";

  return (
    <View style={styles.container}>
      <Text style={styles.city}>Humaitá</Text>

      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        backgroundStyle={styles.sheetBackground}
      >
        <ScrollView contentContainerStyle={styles.content}>

          {/* ALERTA */}
          {isDangerStatus(currentStatus) && (
            <View style={styles.alertBox}>
              <Ionicons name="warning" size={20} color="#fff" />
              <View>
                <Text style={styles.alertTitle}>
                  Emergência - Inundação
                </Text>
                <Text style={styles.alertText}>
                  Nível do rio acima do limite seguro.
                </Text>
              </View>
            </View>
          )}

          {/* NÍVEL DO RIO */}
          <View style={styles.card}>
            <View style={styles.rowBetween}>
              <Text style={styles.cardTitle}>Nível do Rio</Text>
              <MaterialCommunityIcons
                name="waves"
                size={20}
                color="#1976D2"
              />
            </View>

            <View style={styles.levelRow}>
              <Text style={styles.levelValue}>10,99</Text>
              <Text style={styles.meter}> m</Text>
            </View>

            <StatusBadge status={currentStatus} />
          </View>

          {/* PREVISÃO */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Previsão Hidrológica</Text>

            {forecasts.map((f, i) => (
              <View key={i} style={styles.forecastItem}>
                <View style={styles.rowBetween}>
                  <Text style={styles.date}>{f.date}</Text>
                  <StatusBadge status={f.status} />
                </View>
                <Text style={styles.forecastLevel}>{f.level}</Text>
                <Text style={styles.range}>{f.range}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </BottomSheet>
    </View>
  );
}

function StatusBadge({ status }: { status: StatusType }) {
  const config = {
    normal: { color: "#2E7D32", label: "Normalidade" },
    warning: { color: "#ED6C02", label: "Atenção" },
    alert: { color: "#D32F2F", label: "Inundação" },
    emergency: { color: "#B71C1C", label: "Emergência" },
  };

  return (
    <View style={[styles.badge, { backgroundColor: config[status].color }]}>
      <Text style={styles.badgeText}>{config[status].label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
    justifyContent: "flex-end",
  },
  city: {
    position: "absolute",
    top: 80,
    alignSelf: "center",
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
  },
  sheetBackground: {
    backgroundColor: "#fff",
    borderRadius: 24,
  },
  content: {
    padding: 20,
  },
  alertBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#D32F2F",
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  alertTitle: {
    color: "#fff",
    fontWeight: "bold",
  },
  alertText: {
    color: "#fff",
    fontSize: 12,
  },
  card: {
    backgroundColor: "#F9F9F9",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  levelRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  levelValue: {
    fontSize: 48,
    fontWeight: "bold",
  },
  meter: {
    fontSize: 18,
    marginBottom: 8,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 8,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  forecastItem: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginTop: 12,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    fontSize: 12,
    color: "#666",
  },
  forecastLevel: {
    fontSize: 20,
    fontWeight: "bold",
  },
  range: {
    fontSize: 12,
    color: "#777",
  },
});
