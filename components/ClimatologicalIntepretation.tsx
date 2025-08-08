import { descriptionOfInterpretation } from '@/constants/description-of-interpretation'
import { interpretationColors } from '@/constants/intepretation-colors'
import { Text, View } from 'react-native'

interface ClimatologicalInterpretationProps {
  interpretation: '-3' | '-2' | '-1' | '0' | '1' | '2' | '3';
}

export function ClimatologicalInterpretation({
  interpretation,
}: ClimatologicalInterpretationProps) {
  return (
    <View
      style={[
        { alignSelf: 'flex-start'},
        { backgroundColor: interpretationColors[interpretation], },
        {
          padding: 8,
          borderRadius: 16,
        }
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
