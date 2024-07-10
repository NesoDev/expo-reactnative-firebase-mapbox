import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import initializeTomTomMap from '../api/map-api';

const Map = ({ center, zoom }) => {
  useEffect(() => {
    console.log('Creando mapa');
    const ttMap = initializeTomTomMap('tomtom-map', center, zoom);
    console.log('Mapa creado');
    return () => {
      ttMap.remove();
    };
  }, [center, zoom]);

  return <view id="tomtom-map" style={styles.map} />;
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});

export default Map;
