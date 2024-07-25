import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { logoutUser } from '../api/auth-api';
import { FIREBASE_AUTH } from '../core/config';

const auth = FIREBASE_AUTH;

export default function Dashboard() {
  const [userName, setUserName] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserName(user.displayName);
    }
  }, []);

  const handleLogout = async () => {
    const response = await logoutUser();
    if (response.success) {
      navigation.replace('StartScreen');
    }
  };

  // Arreglo de coordenadas
  const coordinates = [
    { latitude: -13.415692, longitude: -76.128662 },
    { latitude: -13.416692, longitude: -76.129662 },
    { latitude: -13.417692, longitude: -76.130662 },
    // Agrega más coordenadas según sea necesario
  ];

  return (
    <View>
      <View style={styles.div} />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -13.415692,
          longitude: -76.128662,
          latitudeDelta: 0.004,
          longitudeDelta: 0.004,
        }}
      >
        <Marker
          coordinate={{ latitude: -13.415692, longitude: -76.128662 }}
          title="Marker Title"
          description="Marker Description"
        />
        {/* Dibuja la ruta con Polyline */}
        <Polyline
          coordinates={coordinates}
          strokeColors={[
            '#7F0000',
            '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
            '#B24112',
            '#E5845C',
            '#238C23',
            '#7F0000',
          ]}
          strokeWidth={6}  // grosor de la línea
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '80%', // Ajusta la altura del mapa según tu diseño
  },
  div: {
    width: '80%',
    height: '20%',
    backgroundColor: 'white',
  },
});
