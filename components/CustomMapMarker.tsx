import { memo } from 'react'
import { PixelRatio, StyleSheet, Text, View } from 'react-native'
import { interpretationColors } from '@/constants/intepretation-colors'

const size = PixelRatio.roundToNearestPixel(33)
const radius = size / 2;

export type ClimatologicalInterpretation =
  | '-3'
  | '-2'
  | '-1'
  | '0'
  | '1'
  | '2'
  | '3'

interface Props {
  elevation: number
  interpretation: ClimatologicalInterpretation
}

function CustomMapMarkerComponent({ elevation, interpretation }: Props) {
  const value = elevation / 100
  const backgroundColor = interpretationColors[interpretation]
  const textColor =
    interpretation === '-3' || interpretation === '3'
      ? '#fff'
      : '#000'


  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.text, { color: textColor }]}>
        {value.toFixed(1)}
      </Text>
    </View>
  )
}

export const CustomMapMarker = memo(CustomMapMarkerComponent)

const styles = StyleSheet.create({
  container: {
    width: size,
    height: size,
    borderRadius: radius,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.2,
    borderColor: '#000',
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
  },
})

