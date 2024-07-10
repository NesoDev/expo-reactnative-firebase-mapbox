import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import { logoutUser } from '../api/auth-api';
import { FIREBASE_AUTH } from '../core/config';
import { useNavigation } from '@react-navigation/native';

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

  return (
    <View>
      <View style={styles.div}/>
      <MapView
          style={styles.map}
          initialRegion={{
            latitude: -13.415692,
            longitude: -76.128662,
            latitudeDelta: 0.004,
            longitudeDelta: 0.004
          }}
        >
          <Marker
            coordinate={{ latitude: -13.415692, longitude: -76.128662, }}
            title="Marker Title"
            description="Marker Description"
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
  }
});
