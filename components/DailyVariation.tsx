import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { View } from 'react-native';
import { formatValueWithUnity } from '@/utils/formatData'

interface DailyVariationProps {
  value: number | null;
}

export function DailyVariation({
  value
}: DailyVariationProps) {
  const isValid = value != null;
  const hasIcon = isValid && value !== 0;

  return (
    <View>
      <View style={styles.sectionVariationLabel}>
            {hasIcon && (
              <Ionicons 
                name={ value > 0 ?
                  "arrow-up-sharp" :
                  "arrow-down-sharp" 
                }
                size={20}
                color="black" 
              />
            )}
            <ThemedText type="lowDefault">
              {isValid ? formatValueWithUnity(value) : "--"}
            </ThemedText>    
      </View>
      <ThemedText type="lowDefault">Variação Diária</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionVariationLabel: {
    flexDirection: 'row',
    justifyContent: 'flex-end' 
  }
})
