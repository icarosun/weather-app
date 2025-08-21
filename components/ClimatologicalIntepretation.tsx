import { descriptionOfInterpretation } from '@/constants/description-of-interpretation'
import { interpretationColors } from '@/constants/intepretation-colors'
import { Text, View, StyleProp } from 'react-native'

interface ClimatologicalInterpretationProps {
  interpretation: '-3' | '-2' | '-1' | '0' | '1' | '2' | '3';
  style?: StyleProp<ViewStyle>;
}

export function ClimatologicalInterpretation({
  interpretation,
  style,
}: ClimatologicalInterpretationProps) {
  return (
    <View
      style={[
        { backgroundColor: interpretationColors[interpretation], },
        {
          padding: 8,
          borderRadius: 16,
        },
        style,
      ]}
    >
      <Text
        style={[
          {
            color:
              interpretation === '-3' || interpretation === '3'
                ? 'white'
                : 'black',
          },
          {
            fontSize: 14,
            fontWeight: 'bold',
          }
        ]}
      >
        {descriptionOfInterpretation[interpretation]}
      </Text>
    </View>
  )
}
