import React, { useState, useEffect } from 'react';
import { Marker } from 'react-native-maps';
import { View } from 'react-native'
import { CustomMapMarker } from '@/components/CustomMapMarker';
import { Station } from '@/constants/stations';

interface StationMarkerProps {
  station: Station;
  onPress: () => void;
}

export const StationMarker = ({ station, onPress }: StationMarkerProps) => {
  // Começa como true para renderizar o conteúdo inicial
  const [shouldTrack, setShouldTrack] = useState(true);

  useEffect(() => {
    // Após o primeiro render, aguarda um pouco e desativa o tracking
    // Isso "congela" o visual do marker e para de piscar
    const timer = setTimeout(() => {
      setShouldTrack(false);
    }, 1200); // 600ms é um tempo seguro para o Google Maps processar a View

    return () => clearTimeout(timer);
  }, []);

  return (
    <Marker
      key={station.id}
      coordinate={{
        latitude: station.latitude,
        longitude: station.longitude,
      }}
      onPress={onPress}
      tracksViewChanges={true}
    // anchor={{ x: 0.3, y: 0.3}}
    >
      <CustomMapMarker
        elevation={station.elevation}
        interpretation={station.climatologicalInterpretation}
      />
    </Marker>
  );
};
