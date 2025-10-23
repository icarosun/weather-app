import { useEffect, useState } from 'react'
import { useStationContext } from '@/hooks/useStationContext'
import { View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export function ChartObservedAndForecast() {
  const [chartData, setChartData] = useState(null);
  const { station } = useStationContext()

  useEffect(() => {
    fetch(`https://labclim.uea.edu.br/api/hydrological-data/graphic/${station.station_id}`)
    .then((response) => response.json())
    .then((data) => {
      const labels = data.map(item => item.date)
      const valuesObserved = data.map(item => item.observed)
      const valuesForecast = data.map(item => item.forecast)

      setChartData({
        labels: labels,
        datasets: [
          {
            data: valuesObserved,
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
            strokeWidth: 2
          }, 
          {
            data: valuesForecast,
            color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
            strokeWidth: 2
          }
        ],
        legend: ["Valor observado", "Valor da previsão"]
      });
    })
    .catch(error => {
      console.error("Erro ao buscar dados: ", error)
    })
  }, [])

  if (!chartData) {
    return <Text>Carregando gráfico...</Text>;
  }

  return (
    <View>
      <LineChart
        data={chartData}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </View>
  )
}
